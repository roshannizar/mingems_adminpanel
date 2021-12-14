import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InvestmentModel } from '../../models/investment-model';
import { InvestmentService } from '../../services/investment.service';
import { InvestmentCreateComponent } from '../investment-create/investment-create.component';

@Component({
  selector: 'app-investment-view',
  templateUrl: './investment-view.component.html',
  styleUrls: ['./investment-view.component.css']
})
export class InvestmentViewComponent implements OnInit {

  isBlock = false;
  investments = new Array<InvestmentModel>();

  constructor(private dialog: MatDialog, private investmentService: InvestmentService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getInvestments();
  }

  getInvestments() {
    this.isBlock = true;
    this.investmentService.getInvestments().subscribe(
      (result) => {
        this.investments = result;
        this.isBlock = false;
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to load investments');
      }
    );
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(InvestmentCreateComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getInvestments();
    });
  }

}
