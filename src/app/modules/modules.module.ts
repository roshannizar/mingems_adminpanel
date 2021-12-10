import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductViewComponent } from './product-management/components/product-view/product-view.component';
import { OrderViewComponent } from './order-management/components/order-view/order-view.component';
import { ProductCreateComponent } from './product-management/components/product-create/product-create.component';
import { SharedModule } from 'app/shared/shared.module';
import { ProductViewDlgComponent } from './product-management/components/product-view-dlg/product-view-dlg.component';
import { ProductDescriptionViewDlgComponent } from './product-management/components/product-description-view-dlg/product-description-view-dlg.component';
import { CategoryCreateComponent } from './category-management/components/category-create/category-create.component';
import { CategoryViewComponent } from './category-management/components/category-view/category-view.component';
import { DeliveryLocationViewComponent } from './delivery-location-management/components/delivery-location-view/delivery-location-view.component';
import { DeliveryLocationCreateComponent } from './delivery-location-management/components/delivery-location-create/delivery-location-create.component';
import { PromotionCreateComponent } from './promotion-management/components/promotion-create/promotion-create.component';
import { PromotionViewComponent } from './promotion-management/components/promotion-view/promotion-view.component';
import { CategoryViewDlgComponent } from './category-management/components/category-view-dlg/category-view-dlg.component';
import { PromotionViewDlgComponent } from './promotion-management/components/promotion-view-dlg/promotion-view-dlg.component';
import { CategoryEditComponent } from './category-management/components/category-edit/category-edit.component';
import { CategoryDeleteComponent } from './category-management/components/category-delete/category-delete.component';
import { ProductDeleteComponent } from './product-management/components/product-delete/product-delete.component';
import { ProductUpdateComponent } from './product-management/components/product-update/product-update.component';
import { PromotionUpdateComponent } from './promotion-management/components/promotion-update/promotion-update.component';
import { DeliveryLocationViewDlgComponent } from './delivery-location-management/components/delivery-location-view-dlg/delivery-location-view-dlg.component';
import { DeliveryLocationUpdateComponent } from './delivery-location-management/components/delivery-location-update/delivery-location-update.component';
import { DeliveryLocationDeleteComponent } from './delivery-location-management/components/delivery-location-delete/delivery-location-delete.component';
import { PromotionDeleteComponent } from './promotion-management/components/promotion-delete/promotion-delete.component';
import { SupportViewComponent } from './support-management/components/support-view/support-view.component';
import { SupportCreateComponent } from './support-management/components/support-create/support-create.component';
import { UserViewComponent } from './user-management/components/user-view/user-view.component';
import { SliderViewComponent } from './slider-management/components/slider-view/slider-view.component';
import { SliderCreateComponent } from './slider-management/components/slider-create/slider-create.component';
import { SliderUpdateComponent } from './slider-management/components/slider-update/slider-update.component';
import { SliderViewDlgComponent } from './slider-management/components/slider-view-dlg/slider-view-dlg.component';
import { SliderDeleteComponent } from './slider-management/components/slider-delete/slider-delete.component';
import { MoreProductsComponent } from './more-management/components/more-products.component';
import { OutOfStockComponent } from './more-management/components/out-of-stock/out-of-stock.component';
import { ProductService } from './product-management/services/product.service';
import { OrderService } from './order-management/services/order.service';
import { DashboardService } from 'app/core/dashboard/services/dashboard.service';
import { OrderTentativeDialogComponent } from './order-management/modal/order-tentative-dialog/order-tentative-dialog.component';
import { LastLoggedComponent } from './more-management/components/last-logged/last-logged.component';
import { PaymentViewComponent } from './payment-management/components/payment-view/payment-view.component';
import { SalesReportComponent } from './report-management/components/sales-report/sales-report.component';
import { ProductReportComponent } from './report-management/components/product-report/product-report.component';
import { ReportsComponent } from './more-management/components/reports/reports.component';
import { FilterDialogComponent } from './report-management/modals/filter-dialog/filter-dialog.component';

@NgModule({
  declarations: [ProductViewComponent, OrderViewComponent, ProductCreateComponent,
    ProductViewDlgComponent, ProductDescriptionViewDlgComponent,
    CategoryCreateComponent, CategoryViewComponent,
    DeliveryLocationViewComponent, DeliveryLocationCreateComponent,
    PromotionCreateComponent, PromotionViewComponent, CategoryViewDlgComponent,
    MoreProductsComponent, PromotionViewDlgComponent, CategoryEditComponent,
    CategoryDeleteComponent, ProductDeleteComponent, ProductUpdateComponent,
    PromotionUpdateComponent, DeliveryLocationViewDlgComponent,
    DeliveryLocationUpdateComponent, DeliveryLocationDeleteComponent,
    PromotionDeleteComponent, SupportViewComponent, SupportCreateComponent,
    UserViewComponent, SliderViewComponent, SliderCreateComponent,
    SliderUpdateComponent, SliderViewDlgComponent, SliderDeleteComponent,
    OutOfStockComponent, OrderTentativeDialogComponent, LastLoggedComponent,
    PaymentViewComponent, SalesReportComponent, ProductReportComponent, ReportsComponent, FilterDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ProductViewComponent,
    OrderViewComponent,
    ProductCreateComponent,
    ProductViewDlgComponent,
    MoreProductsComponent,
    UserViewComponent,
  ],
  providers: [
    ProductService,
    OrderService,
    DashboardService
  ]
})
export class ModulesModule { }
