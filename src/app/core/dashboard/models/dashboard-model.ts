import { DashboardCustomerModel } from '../../../shared/models/dashboard-customer-model';
import { DashboardProductsModel } from '../../../shared/models/dashboard-products-model';
export class DashboardModel {
    stockCount: number;
    outOfStockCount: number;
    totalSalesToday: number;
    totalUser: number;
    sPProductSolds = new Array<DashboardCustomerModel>();
    sPCustomers = new Array<DashboardProductsModel>();
}
