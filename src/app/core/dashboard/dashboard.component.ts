import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ReleaseFeaturesComponent } from './components/release-features/release-features.component';
import { DashboardModel } from './models/dashboard-model';
import { DashboardService } from './services/dashboard.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  block = false;
  customerblock = false;
  dashboardModel = new DashboardModel();

  constructor(private dashboardService: DashboardService, private toastr: ToastrService, private dialog: MatDialog) { }


  ngOnInit() {
    this.getDashboard();
    // this.showFeature();
  }

  getDashboard() {
    this.block = true;
    this.dashboardService.getDashboard().subscribe(
      (result) => {
        this.dashboardModel = result;
        this.block = false;
      },
      (error) => {
        this.block = false;
        this.toastr.error(error.message, 'Failed to load dashboard details');
      }
    );
  }

  openFeature() {
    const dialogRef = this.dialog.open(ReleaseFeaturesComponent, {
      width: '600px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  showFeature() {
    const feature = localStorage.getItem('release');

    // if (feature == null) {
      this.openFeature();
      // localStorage.setItem('release', 'once');
    // }
  }
}
