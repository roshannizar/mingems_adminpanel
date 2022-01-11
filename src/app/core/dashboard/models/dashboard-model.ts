import { DashboardCustomerModel } from '../../../shared/models/dashboard-customer-model';
import { DashboardProductsModel } from '../../../shared/models/dashboard-products-model';
export class DashboardModel {
    totalStocks: number;
    totalCustomers: number;
    totalInvestor: number;
    totalSales: number;
    sPProductSolds = new Array<DashboardCustomerModel>();
    sPCustomers = new Array<DashboardProductsModel>();
}
