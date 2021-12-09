import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './layouts/sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { InventoryViewComponent } from './modules/inventory-management/components/inventory-view/inventory-view.component';
import { InventoryCreateComponent } from './modules/inventory-management/components/inventory-create/inventory-create.component';
import { SupplierCreateComponent } from './modules/supplier-management/components/supplier-create/supplier-create.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    InventoryViewComponent,
    InventoryCreateComponent,
    SupplierCreateComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: false
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
