import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InvestmentModel } from '../../models/investment-model';
import { InvestmentService } from '../../services/investment.service';
import { InvestmentViewComponent } from '../investment-view/investment-view.component';

@Component({
  selector: 'app-investment-create',
  templateUrl: './investment-create.component.html',
  styleUrls: ['./investment-create.component.css']
})
export class InvestmentCreateComponent implements OnInit {

  isBlock = false;

  investmentGroup: FormGroup;
  investment: InvestmentModel;

  constructor(public dialogRef: MatDialogRef<InvestmentViewComponent>, private fb: FormBuilder,
    private investmentService: InvestmentService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createInvestment();
  }

  createInvestment() {
    this.investmentGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      contactno: ['', Validators.required],
      amount: [0, Validators.required]
    })
  }

  onSave() {
    this.isBlock = true;
    this.investment = Object.assign({}, this.investment, this.investmentGroup.value);
    this.investmentService.createInvestment(this.investment).subscribe(
      (result) => {
        this.investmentGroup.reset();
        this.isBlock = false;
        this.close();
        this.toastr.success('Investment created successfully!', 'Success');
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to created invesmtnet');
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}
