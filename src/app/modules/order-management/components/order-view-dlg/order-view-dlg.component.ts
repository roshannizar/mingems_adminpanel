import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderModel } from '../../models/order-model';
import { OrderViewComponent } from '../order-view/order-view.component';

@Component({
  selector: 'app-order-view-dlg',
  templateUrl: './order-view-dlg.component.html',
  styleUrls: ['./order-view-dlg.component.css']
})
export class OrderViewDlgComponent implements OnInit {

  order = new OrderModel();

  constructor(public dialogRef: MatDialogRef<OrderViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderModel) { }

  ngOnInit(): void {
    this.order = this.data;
  }

  close(response: string) {
    this.dialogRef.close(response);
  }
}
