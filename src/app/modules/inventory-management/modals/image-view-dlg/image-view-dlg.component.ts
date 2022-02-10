import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PurchaseModel } from 'app/modules/purchase-management/model/purchase-model';
@Component({
  selector: 'app-image-view-dlg',
  templateUrl: './image-view-dlg.component.html',
  styleUrls: ['./image-view-dlg.component.css']
})
export class ImageViewDlgComponent implements OnInit {

  inventory = new PurchaseModel();

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: PurchaseModel) { }

  ngOnInit(): void {
    this.inventory = this.data;
  }

}
