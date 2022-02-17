export class OrderModel {
    id: string;
    refId: string;
    customerId: string;
    transactionDate: Date;
    paymentDate: Date;
    discount: number;
    totalAmount: number;
    creationDate: Date;
    modificationDate: Date;
    orderStatus: OrderStatus;
    paymentStatus: PaymentStatus;
    Customer: OrderCustomer
    OrderLine = new Array<OrderLine>();
}

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

export class OrderLine {
    id: string;
    orderId: string;
    purchaseId: string;
    quantity: number;
    soldPrice: number;
    actualPrice: number;
    purchase: OrderPurchase;
}

export class OrderPurchase {
    barcode: string;
    name: string;
    description: string;
    measurement: string;
    weight: string;
}
