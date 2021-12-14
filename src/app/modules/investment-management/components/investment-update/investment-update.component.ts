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
  isWholeBlock = false;

  investmentGroup: FormGroup;
  investment: InvestmentModel;

  constructor(public dialogRef: MatDialogRef<InvestmentViewComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: string, private fb: FormBuilder, 
    private investmentService: InvestmentService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createInvestment();
    this.getInvestment(this.data);
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

  getInvestment(id: string) {
    this.isWholeBlock = true;
    this.investmentService.getInvestment(id).subscribe(
      (result) => {
        this.investment = result;
        this.patchInvestment(result);
        this.isWholeBlock = false;
      },
      (error) => {
        this.isWholeBlock = false;
        this.toastr.error(error.message, 'Failed to load investment');
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
