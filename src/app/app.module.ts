import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './core/layouts/sidebar/sidebar.module';
import { FooterModule } from './core/layouts/footer/footer.module';
import { NavbarModule} from './core/layouts/navbar/navbar.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './core/admin-layout/admin-layout.component';
import { InventoryViewComponent } from './modules/inventory-management/components/inventory-view/inventory-view.component';
import { InventoryCreateComponent } from './modules/inventory-management/components/inventory-create/inventory-create.component';
import { SupplierCreateComponent } from './modules/supplier-management/components/supplier-create/supplier-create.component';
import { ModulesModule } from "./modules/modules.module";
import { CoreModule } from "./core/core.module";


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: false
    }),
    ModulesModule,
    CoreModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
