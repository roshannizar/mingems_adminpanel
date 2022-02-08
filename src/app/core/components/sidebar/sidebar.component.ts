import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { version } from '../../../../../package.json';

declare const $: any;
declare interface RouteInfo {

  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '', },
  { path: '/inventory', title: 'Inventory', icon: 'diamond', class: '' },
  { path: '/purchase', title: 'Purchase', icon: 'inventory_2', class: '' },
  { path: '/investment', title: 'Investment', icon: 'paid', class: '' },
  // { path: '/order', title: 'Order', icon: 'point_of_sale', class: '' },
  { path: '/supplier', title: 'Supplier', icon: 'local_shipping', class: '' },
  { path: '/customer', title: 'Customer', icon: 'people', class: '' },
  { path: '/more/subscription', title: 'More/Subscription', icon: 'more', class: 'value' },
  { path: '/more', title: 'More', icon: 'more_horiz', class: '' },
  // { path: '/more/private-code', title: 'More/Out Of Stock', icon: 'more', class: 'value' },
  { path: '/more/users', title: 'More/Users', icon: 'more', class: 'value' },
  { path: '/more/lastlogged', title: 'More/Last Logged', icon: 'more', class: 'value' },
  { path: '/more/profile', title: 'More/Profile', icon: 'more', class: 'value' },
  { path: '/more/privatecodes', title: 'More/Private Code', icon: 'more', class: 'value' },
  { path: '/search', title: 'Search Inventory', icon: 'search', class: 'value' },
  // { path: '/more/report', title: 'More/Report', icon: 'more', class: 'value' },
  // { path: '/more/report/sales-report', title: 'More/Report/Sales Report', icon: 'more', class: 'value' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  fullname: string;
  app_version = version;

  constructor(private router: Router, private jwtService: JwtHelperService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.getUserName();
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getUserName() {
    const token = localStorage.getItem('session');
    const payload = this.jwtService.decodeToken(token);
    this.fullname = payload?.unique_name;
  }


  openLink() {
    window.open('https://trello.com/b/AHZpGF1G/mingem', '_blank');
  }
}
