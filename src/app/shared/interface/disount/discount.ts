export interface IDiscountRequest {
    date: string,
    name: string,
    header: string,
    description: string,
    imagePath: string
}

export interface IDiscountResponse extends IDiscountRequest {
    id: number | string;
}