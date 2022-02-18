import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SettingsModel } from '../../models/settings-model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  settings: SettingsModel[] = [
    {
      name: 'Sales Report',
      description: 'Generate sales report based on days, month and year',
      icon: 'receipt',
      path: ''
    },
    {
      name: 'Product Report',
      description: 'Generate product report, to check your top product sales',
      icon: 'inventory_2',
      path: ''
    },
    {
      name: 'Investor Report',
      description: 'Generate investor report, to check investor\'s investments',
      icon: 'paid',
      path: ''
    },
    {
      name: 'Total Investment Report',
      description: 'Generate investor report, based on total investment of the investor',
      icon: 'money',
      path: ''
    },
    {
      name: 'Supplier Report',
      description: 'Generate supplier report, to check the top suppliers',
      icon: 'local_shipping',
      path: ''
    }
  ];

  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  handleNavigation(path: string) {
    if (path !== '') {
      this.router.navigate([path]);
    } else {
      this.toastr.info('Data is not accurate enough, this might take some time', 'Coming soon');
    }
  }
}
