import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SupplierModel } from 'app/modules/supplier-management/models/supplier-model';
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
  isDelete = false;
  isDisplay = false;

  search: string;
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
      if (result === 'refresh') {
      this.getInvestments();
      }
    });
  }

  openUpdateDialog(model: InvestmentModel) {
    const dialogRef = this.dialog.open(InvestmentUpdateComponent, {
      width: '800px',
      data: model
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getInvestments();
        }
    });
  }

  closeModal() {
    this.isDisplay = false;
    this.investment = null;
    this.isDelete = false;
  }

  openViewModal(investment: InvestmentModel) {
    this.isDisplay = true;
    this.heading_text = 'View Investment';
    this.investment = investment;
  }

  openDeleteModal(investment: InvestmentModel) {
    this.isDelete = true;
    this.investment = investment;
    this.isDisplay = true;
    this.heading_text = `Delete ${investment.refId}`;
  }

  refresh(): void {
    this.closeModal();
    this.getInvestments();
  }

  searchInvestment() {
    if (this.search !== '') {
      const tempinvestment = this.investments.filter(s => s.firstName.toLowerCase()
      .match(this.search.toLowerCase()));

      if (tempinvestment.length === 0) {
        this.investments = this.investments.filter(s => s.lastName.toLowerCase()
        .match(this.search.toLowerCase()));
      } else {
        this.investments = tempinvestment;
      }
    } else {
      this.getInvestments();
    }
  }
}
