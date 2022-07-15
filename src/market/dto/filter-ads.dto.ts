import {
    IsBoolean, IsNumber,
    IsOptional,
    IsString, Max, Min
} from "class-validator";
import { Transform } from "class-transformer";

export class FilterAdsDto {

    @IsOptional()
    @IsString()
    make?: string;

    @IsOptional()
    @IsString()
    model?: string;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1900)
    minYear?: number;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Max(2050)
    maxYear?: number;

    @IsOptional()
    @IsString()
    fuelType?: string;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(0)
    minMileage?: number;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Max(1000000)
    maxMileage?: number;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(50)
    minPower?: number;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Max(2000)
    maxPower?: number;

    @IsOptional()
    @Transform(({ value }) => Boolean(value))
    @IsBoolean()
    defective?: boolean;

    @IsOptional()
    @Transform(({ value }) => Boolean(value))
    @IsBoolean()
    accidentFree?: boolean;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(0)
    minPrice?: number;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Max(1000000000)
    maxPrice?: number;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    voivodeship?: string;
}