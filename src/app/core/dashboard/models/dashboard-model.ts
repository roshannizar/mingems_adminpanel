export class DashboardModel {
    totalStocks: number;
    totalCustomers: number;
    totalInvestor: number;
    totalSales: number;
    totalPendingSales: number;
    totalPurchases: number;
    totalSupplier: number;
    investors = new Array<TopInvestors>();
    customers = new Array<TopCustomers>();

}

export class TopInvestors {
    firstName: string;
    lastName: string;
    fund: number;
    balance: number;
}

export class TopCustomers {
    firstName: string;
    lastName: string;
    email: string;
    totalAmount: string;
}
