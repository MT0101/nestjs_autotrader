import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateAdDto } from "./dto/create-ad.dto";
import { Ad } from "./entities/ad.entity";
import { User } from "../user/entities/user.entity";
import { MulterDiskUploadedFiles } from "../interfaces/files";
import {
  CreateAdResponse,
  GetPaginatedListOfAdsResponse
} from "../interfaces/ad";
import * as fs from 'fs/promises';
import * as path from 'path';
import { storageDir } from "../utils/storage";
import { UpdateAdDto } from "./dto/update-ad.dto";
import { FilterAdsDto } from "./dto/filter-ads.dto";
import { DataSource } from "typeorm";



@Injectable()
export class MarketService {

  constructor(@Inject(DataSource) private dataSource: DataSource,
              @Inject(CACHE_MANAGER) private cacheManager,
              ) {}

  filter(ad: Ad): CreateAdResponse {
    const {
      accidentFree,
      city,
      defective,
      fuelType,
      make,
      mileage,
      model,
      voivodeship,
      year,
      id,
      price,
      details,
      title} = ad;

    return {
      accidentFree,
      city,
      defective,
      fuelType,
      make,
      mileage,
      model,
      voivodeship,
      year,
      id,
      price,
      details,
      title
    };
  }


  async createAd(req: CreateAdDto, user: User, files: MulterDiskUploadedFiles,) {
    const photos = files?.photos?.[0] ?? null;

    try {
      const ad = new Ad();
      ad.title = req.title;
      ad.details = req.details;
      ad.price = req.price;
      ad.year = req.year;
      ad.voivodeship = req.voivodeship;
      ad.model = req.model;
      ad.mileage = req.mileage;
      ad.make = req.make;
      ad.fuelType = req.fuelType;
      ad.defective = req.defective;
      ad.city = req.city;
      ad.accidentFree = req.accidentFree;
      ad.user = user;

      if (photos) {
        ad.photoFn = photos.filename;
      }

      await ad.save();

      return this.filter(ad);

    } catch(err) {
      try {
        if (photos) {
          await fs.unlink(
              path.join(storageDir(), 'car-photos', photos.filename)
          );
        }
      } catch(err2) {}

      throw err.message('ping-pong');
    }
  }

  async selectAllAds(currentPage: number = 1): Promise<GetPaginatedListOfAdsResponse> {

    const maxPerPage = 3;

    const [ads, totalAdsCount] = await Ad.findAndCount({
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });

    const pagesCount = Math.ceil(totalAdsCount / maxPerPage);

    return {
      ads,
      pagesCount,
    }
  }

  async selectOneAd(id: string): Promise<CreateAdResponse> {
    return await Ad.findOne({where: {id}});
  }

  async selectManyAds(filterAdsDto: FilterAdsDto): Promise<FilterAdsDto | FilterAdsDto[]> {

    const ads = await this.dataSource
        .createQueryBuilder()
        .select()
        .from(Ad, 'ads')
        .where('make = :make', { make: filterAdsDto.make })
        .orWhere('model = :model', { model: filterAdsDto.model })
        .orWhere('year BETWEEN :minYear AND :maxYear', { minYear: filterAdsDto.minYear, maxYear: filterAdsDto.maxYear })
        .orWhere('year > :minYear', { minYear: filterAdsDto.minYear })
        .orWhere('year < :maxYear', { maxYear: filterAdsDto.maxYear })
        .orWhere('fuelType = :fuelType', { fuelType: filterAdsDto.fuelType })
        .orWhere('mileage BETWEEN :minMileage AND :maxMileage', { minMileage: filterAdsDto.minMileage, maxMileage: filterAdsDto.maxMileage })
        .orWhere('mileage > :minMileage', { minMileage: filterAdsDto.minMileage })
        .orWhere('mileage < :maxMileage', { maxMileage: filterAdsDto.maxMileage })
        .orWhere('power BETWEEN :minPower AND :maxPower', {  minPower: filterAdsDto.minPower, maxPower: filterAdsDto.maxPower })
        .orWhere('power > :minPower', {  minPower: filterAdsDto.minPower })
        .orWhere('power < :maxPower', {  maxPower: filterAdsDto.maxPower })
        .orWhere('defective = :defective', { defective: filterAdsDto.defective })
        .orWhere('accidentFree = :accidentFree', { accidentFree: filterAdsDto.accidentFree })
        .orWhere('price BETWEEN :minPrice AND :maxPrice', { minPrice: filterAdsDto.minPrice, maxPrice: filterAdsDto.maxPrice })
        .orWhere('price > :minPrice', { minPrice: filterAdsDto.minPrice })
        .orWhere('price < :maxPrice', { maxPrice: filterAdsDto.maxPrice })
        .orWhere('city = :city', { city: filterAdsDto.city })
        .orWhere('voivodeship = :voivodeship', { voivodeship: filterAdsDto.voivodeship })
        .getRawMany()
    return ads;
  }

  async updateAd(id: string, updateAdDto: UpdateAdDto) {
    const ad = await Ad.findOne({where: {id}});
    if (!ad) {
      throw new NotFoundException('ad not found');
    }
    const updatedAd = Object.assign(ad, updateAdDto);
    return await Ad.save(updatedAd);
  }

  async removeAd(id: string) {
    const ad = await Ad.findOne({where: {id}});
    if (!ad) {
      throw new NotFoundException('ad not found');
    }
    await ad.remove();
  }

  async changeApproval(id: string, approved: boolean) {
    const ad = await Ad.findOne({where: {id}});
    if (!ad) {
      throw new NotFoundException('ad not found');
    }
    ad.approved = approved;
    return Ad.save(ad);
  }
}
