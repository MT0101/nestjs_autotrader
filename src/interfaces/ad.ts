
export interface CreateAdResponse {
    id: string;
    title: string;
    make: string;
    model: string;
    year: number;
    fuelType: string;
    mileage: number;
    defective: boolean;
    accidentFree: boolean;
    details: string;
    price: number;
    voivodeship: string;
    city: string;
}

export interface FilterAdsResponse {
    make?: string;
    model?: string;
    minYear?: string;
    maxYear?: string;
    fuelType?: string;
    minMileage?: string;
    maxMileage?: string;
    minPower?: string;
    maxPower?: string;
    defective?: string;
    accidentFree?: string;
    minPrice?: string;
    maxPrice?: string;
    city?: string;
    voivodeship?: string;
}

export type AdInterface = CreateAdResponse;

export interface GetPaginatedListOfAdsResponse {
    ads: AdInterface[];
    pagesCount: number;
}