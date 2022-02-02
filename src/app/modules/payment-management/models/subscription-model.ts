export class SubscriptionModel {
    id: string;
    description: string;
    imageUrl: string;
    billDate: Date;
    dueDate: Date;
    Cost: number;
    subscriptionStatus: SubscriptionEnum;
    creationDate: Date;
    modificationDate: Date;
}

export enum SubscriptionEnum {
    NotPaid,
    Pending,
    Paid
}
