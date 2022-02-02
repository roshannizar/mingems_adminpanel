export class InventoryModel {
    id: string;
    imageLines = new Array<ImageLines>();
    investorId: string;
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
}

export class InventoryInvestor {
    refId: string;
    firstName: string;
    lastName: string;
}
