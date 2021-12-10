import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { UserViewComponent } from './user-management/components/user-view/user-view.component';
import { MoreProductsComponent } from './more-management/components/more-products.component';
import { DashboardService } from 'app/core/dashboard/services/dashboard.service';
import { LastLoggedComponent } from './more-management/components/last-logged/last-logged.component';
import { SalesReportComponent } from './report-management/components/sales-report/sales-report.component';
import { ProductReportComponent } from './report-management/components/product-report/product-report.component';
import { ReportsComponent } from './more-management/components/reports/reports.component';
import { FilterDialogComponent } from './report-management/modals/filter-dialog/filter-dialog.component';

@NgModule({
  declarations: [
    MoreProductsComponent, UserViewComponent, LastLoggedComponent, SalesReportComponent, ProductReportComponent, ReportsComponent, FilterDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    MoreProductsComponent,
    UserViewComponent,
  ],
  providers: [
    DashboardService
  ]
})
export class ModulesModule { }
