export enum OrderStatus {
    Pending,
    Paid,
    Cancelled
}

export enum PaymentStatus {
    Cash,
    Card
}

export class OrderCustomer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    contactNo: string;
}

export class OrderPurchase {
    barcode: string;
    name: string;
    description: string;
    measurement: string;
    weight: string;
}
export class OrderLine {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    soldPrice: number;
    actualPrice: number;
    purchase = new OrderPurchase();
}

export class OrderModel {
    id: string;
    refId: string;
    customerId: string;
    transactionDate: Date;
    paymentDate: Date;
    discount: number;
    vat: number;
    totalAmount: number;
    creationDate: Date;
    modificationDate: Date;
    orderStatus: OrderStatus;
    paymentType: PaymentStatus;
    customer: OrderCustomer
    orderLines = new Array<OrderLine>();
}
