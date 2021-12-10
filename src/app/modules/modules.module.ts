import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { InventoryCreateComponent } from "./inventory-management/components/inventory-create/inventory-create.component";
import { InventoryViewComponent } from "./inventory-management/components/inventory-view/inventory-view.component";
import { SupplierCreateComponent } from "./supplier-management/components/supplier-create/supplier-create.component";

@NgModule({
    declarations: [
        DashboardComponent,
        InventoryCreateComponent,
        InventoryViewComponent,
        SupplierCreateComponent
    ],
    imports: [
        SharedModule
    ]
})
export class ModulesModule {}