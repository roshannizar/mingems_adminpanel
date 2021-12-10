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
      path: 'more/report/sales-report'
    },
    {
      name: 'Product Report',
      description: 'Generate product report, to check your top product sales',
      icon: 'inventory_2',
      path: 'not'
    }
  ];

  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  handleNavigation(path: string) {
    if (path !== 'not') {
      this.router.navigate([path]);
    } else {
      this.toastr.info('Data is not accurate enough, this might take some time', 'Coming soon');
    }
  }
}
