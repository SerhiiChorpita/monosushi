import { ICategoryResponse } from '../category/category';

export interface IProductRequest {
    category: ICategoryResponse,
    path: ICategoryResponse,
    name: string,
    ingredients: string,
    weight: number,
    price: number,
    imagePath: string,
    count: number
}

export interface IProductResponse extends IProductRequest {
    id: number | string
}