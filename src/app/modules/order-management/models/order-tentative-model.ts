export class OrderTentativeModel {
    orderId: string;
    items = new Array<ItemModel>();
    orderTotal: number;
}

export class ItemModel {
    productId: string;
    descriptionId: string;
    quantity: number;
    unitPrice: number;
}