import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '', },
  { path: '/product', title: 'Products', icon: 'inventory_2', class: '' },
  { path: '/order', title: 'Orders', icon: 'point_of_sale', class: '' },
  { path: '/category', title: 'Categories', icon: 'category', class: '' },
  { path: '/promotion', title: 'Promotions', icon: 'card_giftcard', class: '' },
  { path: '/slider', title: 'Sliders', icon: 'linear_scale', class: '' },
  { path: '/delivery-location', title: 'Delivery Location', icon: 'location_on', class: '' },
  // { path: '/payments', title: 'Payments', icon: 'paid', class: ''},
  { path: '/more', title: 'Other', icon: 'more', class: '' },
  { path: '/more/outofstock', title: 'More/Out Of Stock', icon: 'more', class: 'value' },
  { path: '/more/users', title: 'More/Users', icon: 'more', class: 'value' },
  { path: '/more/lastlogged', title: 'More/Last Logged', icon: 'more', class: 'value' },
  { path: '/more/report', title: 'More/Report', icon: 'more', class: 'value' },
  { path: '/more/report/sales-report', title: 'More/Report/Sales Report', icon: 'more', class: 'value' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
