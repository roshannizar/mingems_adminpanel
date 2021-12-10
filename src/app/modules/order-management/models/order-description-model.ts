import {ProductModel} from '../../product-management/models/product-model';

export class OrderDescriptionModel {
    descriptionId: string;
    id: string;
    isDeleted: boolean;
    orderId: string;
    orders: any;
    productId: string;
    products: ProductModel;
    quantity: number;
    unitPrice: number;
    finalPrice: number;
}
