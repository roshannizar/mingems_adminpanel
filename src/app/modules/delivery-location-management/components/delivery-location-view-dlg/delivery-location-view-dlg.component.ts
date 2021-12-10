import {Component, Input, OnInit} from '@angular/core';
import {DeliveryChargeModel} from '../../models/delivery-charge-model';

@Component({
  selector: 'app-delivery-location-view-dlg',
  templateUrl: './delivery-location-view-dlg.component.html',
  styleUrls: ['./delivery-location-view-dlg.component.css']
})
export class DeliveryLocationViewDlgComponent implements OnInit {
  @Input()deliveryCharge: DeliveryChargeModel;

  constructor() { }

  ngOnInit(): void {
  }

}
