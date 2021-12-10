export class OutOfStockModel {
    id: string;
    productId: string;
    singleProduct: OutOfStockProductModel;
    name: string;
    imageUrl: string;
    mrp: number;
    quantity: number;
    rating: number;
    salesCount: number;
    unitPrice: number;
}

export class OutOfStockProductModel {
    name: string;
}
