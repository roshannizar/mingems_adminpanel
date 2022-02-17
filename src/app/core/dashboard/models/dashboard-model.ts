import { DashboardProductsModel } from '../../../shared/models/dashboard-products-model';
export class DashboardModel {
    totalStocks: number;
    totalCustomers: number;
    totalInvestor: number;
    totalSales: number;
    totalPendingSales: number;
    totalPurchases: number;
    totalSupplier: number;
    investors = new Array<TOpInvestors>();
    sPCustomers = new Array<DashboardProductsModel>();
}

export class TOpInvestors {
    firstName: string;
    lastName: string;
    fund: number;
    balance: number;
}
