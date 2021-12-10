import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'fa-area-chart', class: '' },
    { path: '/inventory', title: 'Inventory', icon: 'fa-diamond', class: '' },
    { path: '/purchase', title: 'Purchase', icon: 'fa-shopping-basket', class: '' },
    { path: '/order', title: 'Order', icon: 'fa-balance-scale', class: '' },
    { path: '/investment', title: 'Investment', icon: 'fa-money', class: '' },
    { path: '/supplier', title: 'Supplier', icon: 'fa-truck', class: '' },
    { path: '/customer', title: 'Customer', icon: 'fa-user', class: '' },
    { path: '/more', title: 'More', icon: 'fa-ellipsis-h', class: '' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
