import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ProductViewComponent } from 'app/modules/product-management/components/product-view/product-view.component';
import { OrderViewComponent } from 'app/modules/order-management/components/order-view/order-view.component';
import { CategoryViewComponent } from 'app/modules/category-management/components/category-view/category-view.component';
import { DeliveryLocationViewComponent } from 'app/modules/delivery-location-management/components/delivery-location-view/delivery-location-view.component';
import { PromotionViewComponent } from 'app/modules/promotion-management/components/promotion-view/promotion-view.component';
import { MoreProductsComponent } from '../../../modules/more-management/components/more-products.component';
import { SliderViewComponent } from 'app/modules/slider-management/components/slider-view/slider-view.component';
import { SupportViewComponent } from 'app/modules/support-management/components/support-view/support-view.component';
import { OutOfStockComponent } from 'app/modules/more-management/components/out-of-stock/out-of-stock.component';
import { LastLoggedComponent } from 'app/modules/more-management/components/last-logged/last-logged.component';
import { UserViewComponent } from 'app/modules/user-management/components/user-view/user-view.component';
import { PaymentViewComponent } from 'app/modules/payment-management/components/payment-view/payment-view.component';
import { ReportsComponent } from 'app/modules/more-management/components/reports/reports.component';
import { SalesReportComponent } from 'app/modules/report-management/components/sales-report/sales-report.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard', component: DashboardComponent },
    { path: 'product', component: ProductViewComponent },
    { path: 'order', component: OrderViewComponent },
    { path: 'category', component: CategoryViewComponent },
    { path: 'promotion', component: PromotionViewComponent },
    { path: 'delivery-location', component: DeliveryLocationViewComponent },
    { path: 'slider', component: SliderViewComponent },
    { path: 'support', component: SupportViewComponent },
    { path: 'more/outofstock', component: OutOfStockComponent },
    { path: 'more/users', component: UserViewComponent },
    { path: 'more/lastlogged', component: LastLoggedComponent },
    { path: 'more', component: MoreProductsComponent },
    { path: 'more/report', component: ReportsComponent },
    { path: 'more/report/sales-report', component: SalesReportComponent }
    // { path: 'payments', component: PaymentViewComponent }
];
