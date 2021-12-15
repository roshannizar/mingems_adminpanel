import { Component, Input, OnInit } from '@angular/core';
import { SupplierModel } from '../../models/supplier-model';

@Component({
  selector: 'app-supplier-view-dlg',
  templateUrl: './supplier-view-dlg.component.html',
  styleUrls: ['./supplier-view-dlg.component.css']
})
export class SupplierViewDlgComponent implements OnInit {

  @Input() supplier = new SupplierModel();

  constructor() { }

  ngOnInit(): void {
  }

}
