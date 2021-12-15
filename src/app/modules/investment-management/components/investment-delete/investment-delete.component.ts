import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InvestmentModel } from '../../models/investment-model';
import { InvestmentService } from '../../services/investment.service';

@Component({
  selector: 'app-investment-delete',
  templateUrl: './investment-delete.component.html',
  styleUrls: ['./investment-delete.component.css']
})
export class InvestmentDeleteComponent implements OnInit {

  isBlock = false;
  isClear = false;

  name: string;
  message: string;

  @Input() investment: InvestmentModel;
  @Output() deleted = new EventEmitter();

  constructor(private toastr: ToastrService, private investmentService: InvestmentService) { }

  ngOnInit(): void {
    this.message = `'${this.investment.refId}'`;
    this.name = this.investment.refId;
  }

  confirmDelete(id: string) {
    this.isBlock = true;
    this.investmentService.deleteInvestment(id).subscribe(
      (result) => {
        this.isBlock = false;
        this.isClear = true;
        this.deleted.emit();
        this.toastr.success('Deleted successfully!');
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, `Failed to delete ${id}`);
      }
    );
  }
}
