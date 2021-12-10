import { Routes } from '@angular/router';
import { InventoryViewComponent } from '../../modules/inventory-management/components/inventory-view/inventory-view.component';

import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'inventory', component: InventoryViewComponent }
];
