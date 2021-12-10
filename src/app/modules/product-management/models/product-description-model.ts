import { ProductModel } from "./product-model";

export class ProductDescriptionModel {
    id: string;
    productId: string;
    singleProduct: ProductModel;
    name: string;
    imageUrl: string;
    mrp: number;
    quantity: number;
    rating: number;
    salesCount: number;
    unitPrice: number;
    recordState: RecordState
}

export enum RecordState {
    Active = 0,
    InActive = 1,
    Deleted = 2
}
