export class PurchaseModel {
    id: string;
    name: string;
    description: string;
    investorId: string;
    transactionDate: Date;
    unitPrice: number;
    exportCost: number;
    supplierId: string;
    investmentId: string;
    supplier: PurchaseSupplierModel
    investment: PurchaseInvestorModel;
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
}
