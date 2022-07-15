import {
    IsBoolean,
    IsNumber,
    IsString, Max, Min
} from "class-validator";


export class CreateAdDto {

    @IsString()
    title: string;

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1900)
    @Max(2050)
    year: number;

    @IsString()
    fuelType: string;

    @IsNumber()
    power: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @IsBoolean()
    defective: boolean;

    @IsBoolean()
    accidentFree: boolean;

    @IsString()
    details: string;

    @IsNumber()
    price: number;

    @IsString()
    voivodeship: string;

    @IsString()
    city: string;

    @IsString()
    userId: string;
}
