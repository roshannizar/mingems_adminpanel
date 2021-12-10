import { Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { MoreProductsComponent } from '../../modules/more-management/components/more-products.component';
import { LastLoggedComponent } from 'app/modules/more-management/components/last-logged/last-logged.component';
import { UserViewComponent } from 'app/modules/user-management/components/user-view/user-view.component';
import { ReportsComponent } from 'app/modules/more-management/components/reports/reports.component';
import { SalesReportComponent } from 'app/modules/report-management/components/sales-report/sales-report.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard', component: DashboardComponent },
    { path: 'more/users', component: UserViewComponent },
    { path: 'more/lastlogged', component: LastLoggedComponent },
    { path: 'more', component: MoreProductsComponent },
    { path: 'more/report', component: ReportsComponent },
    { path: 'more/report/sales-report', component: SalesReportComponent }
];
