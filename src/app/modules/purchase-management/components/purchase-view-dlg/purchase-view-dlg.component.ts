import { Component, Input, OnInit } from '@angular/core';
import { PurchaseModel } from '../../model/purchase-model';

@Component({
  selector: 'app-purchase-view-dlg',
  templateUrl: './purchase-view-dlg.component.html',
  styleUrls: ['./purchase-view-dlg.component.css']
})
export class PurchaseViewDlgComponent implements OnInit {

  @Input() purchase = new PurchaseModel();
  constructor() { }

  ngOnInit(): void {
  }

}
