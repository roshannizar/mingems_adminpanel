import { Routes } from '@angular/router';
import { InventoryViewComponent } from 'app/modules/inventory-management/components/inventory-view/inventory-view.component';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'inventory', component: InventoryViewComponent }
];
