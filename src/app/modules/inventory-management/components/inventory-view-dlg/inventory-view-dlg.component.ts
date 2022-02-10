import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseModel } from 'app/modules/purchase-management/model/purchase-model';
import { ImageViewDlgComponent } from '../../modals/image-view-dlg/image-view-dlg.component';

@Component({
  selector: 'app-inventory-view-dlg',
  templateUrl: './inventory-view-dlg.component.html',
  styleUrls: ['./inventory-view-dlg.component.css']
})
export class InventoryViewDlgComponent implements OnInit {

  @Input() inventory = new PurchaseModel();
  
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openImageDialog() {
    const dialogRef = this.dialog.open(ImageViewDlgComponent, {
      width: '300px',
      data: this.inventory
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getTotalCost(inventory: PurchaseModel) {
    return inventory.unitPrice + inventory.exportCost + inventory.commissionCost + inventory.certificateCost + inventory.recuttingCost
  }
}
