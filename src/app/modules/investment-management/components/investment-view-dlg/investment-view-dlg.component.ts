import { Component, Input, OnInit } from '@angular/core';
import { InvestmentModel } from '../../models/investment-model';

@Component({
  selector: 'app-investment-view-dlg',
  templateUrl: './investment-view-dlg.component.html',
  styleUrls: ['./investment-view-dlg.component.css']
})
export class InvestmentViewDlgComponent implements OnInit {

  @Input() investment: InvestmentModel;

  constructor() { }

  ngOnInit(): void {
  }

}
