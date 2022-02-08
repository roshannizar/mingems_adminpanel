export class InventoryModel {
    id: string;
    imageLines = new Array<ImageLines>();
    investorId: string;
    purchaseId: string;
    // tslint:disable-next-line: no-use-before-declare
    investment = new InventoryInvestor();
    barcode: string;
    name: string;
    description: string;
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
    creationDate: Date;
    modificationDate: Date;
}

export class ImageLines {
    id: string;
    url: string;
    inventoryId: string;
    recordState: RecordState;
}

export class InventoryInvestor {
    refId: string;
    firstName: string;
    lastName: string;
}

export enum RecordState {
    Active,
    Removed
}
