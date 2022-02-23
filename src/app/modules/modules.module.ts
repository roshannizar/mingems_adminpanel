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
import { InvestmentCreateComponent } from './investment-management/components/investment-create/investment-create.component';
import { InvestmentViewComponent } from './investment-management/components/investment-view/investment-view.component';
import { InvestmentUpdateComponent } from './investment-management/components/investment-update/investment-update.component';
import { InvestmentDeleteComponent } from './investment-management/components/investment-delete/investment-delete.component';
import { InventoryDeleteComponent } from './inventory-management/components/inventory-delete/inventory-delete.component';
import { InventoryViewComponent } from './inventory-management/components/inventory-view/inventory-view.component';
import { InventoryUpdateComponent } from './inventory-management/components/inventory-update/inventory-update.component';
import { SupplierUpdateComponent } from './supplier-management/components/supplier-update/supplier-update.component';
import { SupplierCreateComponent } from './supplier-management/components/supplier-create/supplier-create.component';
import { SupplierViewComponent } from './supplier-management/components/supplier-view/supplier-view.component';
import { SupplierDeleteComponent } from './supplier-management/components/supplier-delete/supplier-delete.component';
import { PurchaseDeleteComponent } from './purchase-management/components/purchase-delete/purchase-delete.component';
import { PurchaseViewComponent } from './purchase-management/components/purchase-view/purchase-view.component';
import { PurchaseCreateComponent } from './purchase-management/components/purchase-create/purchase-create.component';
import { PurchaseUpdateComponent } from './purchase-management/components/purchase-update/purchase-update.component';
import { OrderViewComponent } from './order-management/components/order-view/order-view.component';
import { CustomerViewComponent } from './customer-management/components/customer-view/customer-view.component';
import { CustomerCreateComponent } from './customer-management/components/customer-create/customer-create.component';
import { CustomerUpdateComponent } from './customer-management/components/customer-update/customer-update.component';
import { CustomerDeleteComponent } from './customer-management/components/customer-delete/customer-delete.component';
import { OrderCreateComponent } from './order-management/components/order-create/order-create.component';
import { InvestmentViewDlgComponent } from './investment-management/components/investment-view-dlg/investment-view-dlg.component';
import { SupplierViewDlgComponent } from './supplier-management/components/supplier-view-dlg/supplier-view-dlg.component';
import { PurchaseViewDlgComponent } from './purchase-management/components/purchase-view-dlg/purchase-view-dlg.component';
import { CustomerViewDlgComponent } from './customer-management/components/customer-view-dlg/customer-view-dlg.component';
import { PaymentUpdateComponent } from './payment-management/components/payment-update/payment-update.component';
import { InventoryViewDlgComponent } from './inventory-management/components/inventory-view-dlg/inventory-view-dlg.component';
import { ImageViewDlgComponent } from './inventory-management/modals/image-view-dlg/image-view-dlg.component';
import { ProfileViewComponent } from './profile-management/components/profile-view/profile-view.component';
import { MoveProductComponent } from './purchase-management/modals/move-product/move-product.component';
import { PaymentViewComponent } from './payment-management/components/payment-view/payment-view.component';
import { PrintDlgComponent } from './inventory-management/modals/print-dlg/print-dlg.component';
import { PrivateCodeViewComponent } from './private-code-management/components/private-code-view/private-code-view.component';
import { PrivateCodeCreateComponent } from './private-code-management/components/private-code-create/private-code-create.component';
import { PrivateCodeUpdateComponent } from './private-code-management/components/private-code-update/private-code-update.component';
import { PrivateCodeDeleteComponent } from './private-code-management/components/private-code-delete/private-code-delete.component';
import { PrivateCodeViewDlgComponent } from './private-code-management/components/private-code-view-dlg/private-code-view-dlg.component';
import { SearchViewComponent } from './search-management/components/search-view/search-view.component';
import { OrderViewDlgComponent } from './order-management/components/order-view-dlg/order-view-dlg.component';
import { PaymentModalComponent } from './order-management/modals/payment-modal/payment-modal.component';
import { InvoiceModalComponent } from './order-management/modals/invoice-modal/invoice-modal.component';


@NgModule({
  declarations: [
    MoreProductsComponent, UserViewComponent, LastLoggedComponent,
    SalesReportComponent, ProductReportComponent, ReportsComponent, FilterDialogComponent,
    InvestmentCreateComponent, InvestmentViewComponent, InvestmentUpdateComponent, InvestmentDeleteComponent,
    InventoryDeleteComponent, InventoryViewComponent, InventoryUpdateComponent, 
    SupplierUpdateComponent, SupplierCreateComponent,
    SupplierViewComponent, SupplierDeleteComponent, PurchaseDeleteComponent, PurchaseViewComponent,
    PurchaseCreateComponent, PurchaseUpdateComponent, OrderViewComponent,
    CustomerViewComponent, CustomerCreateComponent, CustomerUpdateComponent, CustomerDeleteComponent,
    OrderCreateComponent, InvestmentViewDlgComponent, SupplierViewDlgComponent, PurchaseViewDlgComponent, CustomerViewDlgComponent, MoveProductComponent, PaymentViewComponent, PaymentUpdateComponent, PrintDlgComponent, InventoryViewDlgComponent, ImageViewDlgComponent, ProfileViewComponent, PrivateCodeViewComponent, PrivateCodeCreateComponent, PrivateCodeUpdateComponent, PrivateCodeDeleteComponent, PrivateCodeViewDlgComponent, SearchViewComponent, OrderViewDlgComponent, PaymentModalComponent, InvoiceModalComponent],
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
