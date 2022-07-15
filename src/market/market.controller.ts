import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  CacheInterceptor,
  UploadedFiles, UseGuards
} from '@nestjs/common';
import { MarketService } from './market.service';
import { CreateAdDto } from "./dto/create-ad.dto";
import { UpdateAdDto } from "./dto/update-ad.dto";
import {
  CreateAdResponse,
  GetPaginatedListOfAdsResponse,
} from "../interfaces/ad";
import { FilterAdsDto } from "./dto/filter-ads.dto";
import { User } from "../user/entities/user.entity";
import { MulterDiskUploadedFiles } from "../interfaces/files";
import { AuthGuard } from "@nestjs/passport";
import { UserObj } from 'src/decorators/user-obj.decorator';
import { AdminGuard } from "../guards/admin.guard";
import { ApproveAdDto } from "./dto/approve-ad.dto";
import { Serialize } from "../interceptors/serialize.interceptor";



@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Post('/')
  @Serialize(CreateAdDto)
  create(@Body() createAdDto: CreateAdDto, @UserObj() user: User, @UploadedFiles() files: MulterDiskUploadedFiles) {
    console.log(createAdDto);
    return this.marketService.createAd(createAdDto, user, files);
  }

  @Get('/filter')
  findMany(
      @Query() query: FilterAdsDto
  ): Promise<FilterAdsDto | FilterAdsDto[]> {
    console.log(query);
    return this.marketService.selectManyAds(query);
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/')
  findAll(): Promise<GetPaginatedListOfAdsResponse> {
    return this.marketService.selectAllAds();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CreateAdResponse> {
    return this.marketService.selectOneAd(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdDto: UpdateAdDto) {
    return this.marketService.updateAd(id, updateAdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketService.removeAd(id);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveAd(@Param('id') id: string, @Body() body: ApproveAdDto) {
    return this.marketService.changeApproval(id, body.approved);
  }
}
