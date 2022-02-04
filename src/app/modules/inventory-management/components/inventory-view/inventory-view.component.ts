import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ImageViewDlgComponent } from '../../modals/image-view-dlg/image-view-dlg.component';
import { PrintDlgComponent } from '../../modals/print-dlg/print-dlg.component';
import { InventoryModel } from '../../models/inventory-model';
import { InventoryService } from '../../services/inventory.service';
import { InventoryCreateComponent } from '../inventory-create/inventory-create.component';

@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.css']
})
export class InventoryViewComponent implements OnInit {

  isBlock = false;
  isDelete = false;
  isDisplay = false;

  heading_text: string;

  inventories = new Array<InventoryModel>();
  inventory = new InventoryModel();

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

  openCreateDialog() {
    const dialogRef = this.dialog.open(InventoryCreateComponent, {
      width: '1200px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getInventories();
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

  openImageDialog(inventory: InventoryModel) {
    const dialogRef = this.dialog.open(ImageViewDlgComponent, {
      width: '300px',
      data: inventory
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  closeModal() {
    this.isDisplay = false;
    this.inventory = null;
    this.isDelete = false;
  }

  openViewModal(inventory: InventoryModel) {
    this.isDisplay = true;
    this.heading_text = 'View Inventory';
    this.inventory = inventory;
  }

  openDeleteModal(inventory: InventoryModel) {
    this.isDelete = true;
    this.inventory = inventory;
    this.isDisplay = true;
    this.heading_text = `Delete ${inventory.name}`;
  }

  refresh(): void {
    this.closeModal();
    this.getInventories();
  }
}
