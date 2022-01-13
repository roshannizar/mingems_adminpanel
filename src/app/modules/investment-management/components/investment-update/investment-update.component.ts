import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InvestmentModel } from '../../models/investment-model';
import { InvestmentService } from '../../services/investment.service';
import { InvestmentViewComponent } from '../investment-view/investment-view.component';

@Component({
  selector: 'app-investment-update',
  templateUrl: './investment-update.component.html',
  styleUrls: ['./investment-update.component.css']
})
export class InvestmentUpdateComponent implements OnInit {

  isBlock = false;
  isInvestorBlock = false;

  investmentGroup: FormGroup;
  investment: InvestmentModel;

  investors = new Array<InvestmentModel>();

  constructor(public dialogRef: MatDialogRef<InvestmentViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InvestmentModel, private fb: FormBuilder,
    private investmentService: InvestmentService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createInvestment();
    this.getInvestors();
    this.patchInvestment(this.data);
  }

  createInvestment() {
    this.investmentGroup = this.fb.group({
      id: ['', Validators.required],
      refId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      contactno: ['', Validators.required],
      amount: [0, Validators.required]
    })
  }

  getInvestors() {
    this.isInvestorBlock = true;
    this.investmentService.getOriginInvestments().subscribe(
      (result) => {
        this.investors = result;
        this.isInvestorBlock = false;
      },
      (error) => {
        this.isInvestorBlock = false;
        this.toastr.error(error.message, 'Failed to load investors');
      }
    );
  }

  patchInvestment(investment: InvestmentModel) {
    this.investmentGroup.patchValue({
      id: investment.id,
      refId: investment.refId,
      firstName: investment.firstName,
      lastName: investment.lastName,
      email:  investment.email,
      contactno: investment.contactNo,
      amount: investment.amount
    });
  }

  onUpdate() {
    this.isBlock = true;
    this.investment = Object.assign({}, this.investment, this.investmentGroup.value);
    this.investmentService.updateInvestment(this.investment).subscribe(
      (result) => {
        this.isBlock = false;
        this.close();
        this.toastr.success('Updated successfully!','Success');
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to update investment');
      }
    );
  }

  close() {
    this.dialogRef.close();
  }
}
