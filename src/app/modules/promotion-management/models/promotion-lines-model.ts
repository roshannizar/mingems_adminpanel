import { ProductModel } from "app/modules/product-management/models/product-model";

export class PromotionLinesModel {
    id: string;
    productId: string;
    product = new ProductModel();
    promotionId: string;
    descriptionId: string;
    quantity: number;
    unitPrice: number;
    discountPrice: number;
}