import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderViewComponent } from '../../components/order-view/order-view.component';
import { OrderModel } from '../../models/order-model';

@Component({
  selector: 'app-invoice-modal',
  templateUrl: './invoice-modal.component.html',
  styleUrls: ['./invoice-modal.component.css']
})
export class InvoiceModalComponent implements OnInit {

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
