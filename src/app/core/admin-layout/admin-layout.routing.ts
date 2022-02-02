import { Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { MoreProductsComponent } from '../../modules/more-management/components/more-products.component';
import { LastLoggedComponent } from 'app/modules/more-management/components/last-logged/last-logged.component';
import { UserViewComponent } from 'app/modules/user-management/components/user-view/user-view.component';
import { InvestmentViewComponent } from 'app/modules/investment-management/components/investment-view/investment-view.component';
import { PurchaseViewComponent } from 'app/modules/purchase-management/components/purchase-view/purchase-view.component';
import { SupplierViewComponent } from 'app/modules/supplier-management/components/supplier-view/supplier-view.component';
import { InventoryViewComponent } from 'app/modules/inventory-management/components/inventory-view/inventory-view.component';
import { CustomerViewComponent } from 'app/modules/customer-management/components/customer-view/customer-view.component';
import { PaymentViewComponent } from 'app/modules/payment-management/components/payment-view/payment-view.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard', component: DashboardComponent },
    { path: 'inventory', component: InventoryViewComponent },
    { path: 'purchase', component: PurchaseViewComponent },
    // { path: 'order', component: OrderViewComponent},
    { path: 'payment', component: PaymentViewComponent },
    { path: 'supplier', component: SupplierViewComponent },
    { path: 'investment', component: InvestmentViewComponent },
    { path: 'customer', component: CustomerViewComponent },
    { path: 'more', component: MoreProductsComponent },
    { path: 'more/users', component: UserViewComponent },
    // { path: 'more/report', component: ReportsComponent },
    { path: 'more/lastlogged', component: LastLoggedComponent },
    // { path: 'more/private-code', component: PrivateCodeViewComponent},
    // { path: 'more/report/sales-report', component: SalesReportComponent }
];
