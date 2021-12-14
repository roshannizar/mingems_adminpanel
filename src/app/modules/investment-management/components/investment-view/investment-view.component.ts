import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InvestmentModel } from '../../models/investment-model';
import { InvestmentService } from '../../services/investment.service';
import { InvestmentCreateComponent } from '../investment-create/investment-create.component';
import { InvestmentUpdateComponent } from '../investment-update/investment-update.component';

@Component({
  selector: 'app-investment-view',
  templateUrl: './investment-view.component.html',
  styleUrls: ['./investment-view.component.css']
})
export class InvestmentViewComponent implements OnInit {

  isBlock = false;
  isDisplay = false;

  heading_text: string;

  investment = new InvestmentModel();
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

  openUpdateDialog(id: string) {
    const dialogRef = this.dialog.open(InvestmentUpdateComponent, {
      width: '800px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getInvestments();
    });
  }

  closeModal() {
    this.isDisplay = false;
    this.investment = null;
  }

  openInvestmentModal(investment: InvestmentModel) {
    this.isDisplay = true;
    this.heading_text = 'View Investment';
    this.investment = investment;
  }

}
