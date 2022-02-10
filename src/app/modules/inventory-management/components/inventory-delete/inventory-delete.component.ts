import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PurchaseModel } from 'app/modules/purchase-management/model/purchase-model';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-delete',
  templateUrl: './inventory-delete.component.html',
  styleUrls: ['./inventory-delete.component.css']
})
export class InventoryDeleteComponent implements OnInit {

  isBlock = false;
  name: string;

  @Input() inventory: PurchaseModel;
  @Output() deleted = new EventEmitter();

  constructor(private inventoryService: InventoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.name = this.inventory.name;
  }

  confirmDelete(id: string) {
    this.isBlock = true;
    this.inventoryService.deleteInventory(id).subscribe(
      (result) => {
        this.isBlock = false;
        this.deleted.emit();
        this.toastr.success('Deleted successfully and Reverted the Purchase!');
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, `Failed to delete ${id}`);
      }
    );
  }

}
