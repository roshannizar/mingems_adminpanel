import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryModel } from '../../models/inventory-model';

@Component({
  selector: 'app-image-view-dlg',
  templateUrl: './image-view-dlg.component.html',
  styleUrls: ['./image-view-dlg.component.css']
})
export class ImageViewDlgComponent implements OnInit {

  inventory = new InventoryModel();

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: InventoryModel) { }

  ngOnInit(): void {
    this.inventory = this.data;
  }

}
