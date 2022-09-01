export interface IDiscountRequest {
    date: string,
    name: string,
    header: string,
    description: string,
    imagePath: string
}

export interface IDiscountResponce extends IDiscountRequest {
    id: number
}