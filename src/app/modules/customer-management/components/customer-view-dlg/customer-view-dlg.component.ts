import { Component, Input, OnInit } from '@angular/core';
import { CustomerModel } from '../../models/customer-model';

@Component({
  selector: 'app-customer-view-dlg',
  templateUrl: './customer-view-dlg.component.html',
  styleUrls: ['./customer-view-dlg.component.css']
})
export class CustomerViewDlgComponent implements OnInit {

  @Input() customer = new CustomerModel();
  
  constructor() { }

  ngOnInit(): void {
  }

}
