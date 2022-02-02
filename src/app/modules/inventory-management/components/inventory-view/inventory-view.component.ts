import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
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
  inventories = new Array<InventoryModel>();

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

}
