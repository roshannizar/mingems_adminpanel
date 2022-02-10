export class PurchaseModel {
    id: string;
    imageLines = new Array<ImageLines>();
    barcode: string;
    name: string;
    description: string;
    investorId: string;
    previousInvestorId: string;
    transactionDate: Date;
    quantity: number;
    unitPrice: number;
    recuttingCost: number;
    certificateCost: number;
    commissionCost: number;
    exportCost: number;
    measurement: string;
    weight: string;
    priceCode: string;
    lastPriceCode: string;
    supplierId: string;
    supplier: PurchaseSupplierModel
    investment: PurchaseInvestorModel;
    moved: boolean;
}

export class ImageLines {
    id: string;
    url: string;
    purchaseId: string;
    recordState: RecordState;
}
export class PurchaseSupplierModel {
    id: string;
    name: string;
}

export class PurchaseInvestorModel {
    id: string;
    refId: string;
    firstName: string;
    lastName: string;
    amount: number;
    remainingAmount: number;
}

export enum RecordState {
    Active,
    Removed
}
