import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseModel } from 'app/modules/purchase-management/model/purchase-model';
import { ToastrService } from 'ngx-toastr';
import { ImageViewDlgComponent } from '../../modals/image-view-dlg/image-view-dlg.component';
import { PrintDlgComponent } from '../../modals/print-dlg/print-dlg.component';
import { InventoryService } from '../../services/inventory.service';
import { InventoryUpdateComponent } from '../inventory-update/inventory-update.component';

@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.css']
})
export class InventoryViewComponent implements OnInit {

  isBlock = false;
  isDelete = false;
  isSearch = false;
  isDisplay = false;

  heading_text: string;

  inventories = new Array<PurchaseModel>();
  inventory = new PurchaseModel();

  constructor(private dialog: MatDialog, private inventoryService: InventoryService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getInventories();
  }

  getInventories() {
    this.isBlock = true;
    this.inventoryService.getInventories().subscribe(
      (result) => {
        this.inventories = result;
        this.isBlock = false;
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to load inventories');
      }
    );
  }

  openUpdateDialog(inventory: PurchaseModel) {
    const dialogRef = this.dialog.open(InventoryUpdateComponent, {
      width: '800px',
      data: inventory
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getInventories();
      }
    });
  }

  openPrintDialog(id: string) {
    const dialogRef = this.dialog.open(PrintDlgComponent, {
      width: '300px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openImageDialog(inventory: PurchaseModel) {
    const dialogRef = this.dialog.open(ImageViewDlgComponent, {
      width: '300px',
      data: inventory
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openFilterDialog() {
    this.isSearch = true;
  }

  closeModal() {
    this.isDisplay = false;
    this.inventory = null;
    this.isDelete = false;
  }

  openViewModal(inventory: PurchaseModel) {
    this.isDisplay = true;
    this.heading_text = 'View Inventory';
    this.inventory = inventory;
  }

  openDeleteModal(inventory: PurchaseModel) {
    this.isDelete = true;
    this.inventory = inventory;
    this.isDisplay = true;
    this.heading_text = `Delete ${inventory.name}`;
  }

  refresh(): void {
    this.closeModal();
    this.getInventories();
  }

  getTotalCost(inventory: PurchaseModel) {
    return inventory.unitPrice + inventory.exportCost + inventory.commissionCost + inventory.certificateCost + inventory.recuttingCost
  }
}
