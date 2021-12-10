import { Component, Input, OnInit } from '@angular/core';
import { PromotionModel } from '../../models/promotion-model';

@Component({
  selector: 'app-promotion-view-dlg',
  templateUrl: './promotion-view-dlg.component.html',
  styleUrls: ['./promotion-view-dlg.component.css']
})
export class PromotionViewDlgComponent implements OnInit {

  @Input() promotion: PromotionModel;
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
