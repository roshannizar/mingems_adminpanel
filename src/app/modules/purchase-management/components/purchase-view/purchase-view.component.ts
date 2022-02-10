import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PrintDlgComponent } from 'app/modules/inventory-management/modals/print-dlg/print-dlg.component';
import { InventoryService } from 'app/modules/inventory-management/services/inventory.service';
import { ToastrService } from 'ngx-toastr';
import { MoveProductComponent } from '../../modals/move-product/move-product.component';
import { PurchaseModel } from '../../model/purchase-model';
import { PurchaseService } from '../../services/purchase.service';
import { PurchaseCreateComponent } from '../purchase-create/purchase-create.component';
import { PurchaseUpdateComponent } from '../purchase-update/purchase-update.component';

@Component({
  selector: 'app-purchase-view',
  templateUrl: './purchase-view.component.html',
  styleUrls: ['./purchase-view.component.css']
})
export class PurchaseViewComponent implements OnInit {

  isBlock = false;
  isDelete = false;
  isDisplay = false;

  search: string;
  heading_text = 'View Purchase'

  purchases = new Array<PurchaseModel>();
  purchase = new PurchaseModel();

  constructor(private dialog: MatDialog, private purchaseService: PurchaseService,
    private toastr: ToastrService, private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.getPurchases();
  }

  getPurchases() {
    this.isBlock = true;
    this.purchaseService.getPurchases().subscribe(
      (result) => {
        this.purchases = result;
        this.isBlock = false;
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to load purchases');
      }
    );
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(PurchaseCreateComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getPurchases();
      }
    });
  }

  openUpdateDialog(purchase: PurchaseModel) {
    const dialogRef = this.dialog.open(PurchaseUpdateComponent, {
      width: '800px',
      data: purchase
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getPurchases();
      }
    });
  }

  closeModal() {
    this.isDisplay = false;
    this.purchase = null;
    this.isDelete = false;
  }

  openViewModal(purchase: PurchaseModel) {
    this.isDisplay = true;
    this.heading_text = 'View Purchase';
    this.purchase = purchase;
  }

  openDeleteModal(purchase: PurchaseModel) {
    this.isDelete = true;
    this.purchase = purchase;
    this.isDisplay = true;
    this.heading_text = `Delete ${purchase.name}`;
  }

  refresh(): void {
    this.closeModal();
    this.getPurchases();
  }

  searchPurchase() {
    if (this.search !== '') {
      let tempPurchase = this.purchases.filter(s => s.name.toLowerCase().match(this.search.toLowerCase()));

      if (tempPurchase.length === 0) {
        tempPurchase = this.purchases.filter(s => s.investment.firstName.toLowerCase().match(this.search.toLowerCase()));

        if (tempPurchase.length === 0) {
          this.purchases = this.purchases.filter(s => s.supplier.name.toLowerCase().match(this.search.toLowerCase()));
        } else {
          this.purchases = tempPurchase;
        }
      } else {
        this.purchases = tempPurchase;
      }
    } else {
      this.getPurchases();
    }
  }

  moveToProduct(purchase: PurchaseModel, index: number) {
    if (purchase.supplier !== null) {
      if (purchase.investment !== null) {
        this.openMoveProductDialog(purchase);
      } else {
        this.getPurchases();
        this.toastr.warning('Investor cannot be null!', 'Invalid values');
      }
    } else {
      this.getPurchases();
      this.toastr.warning('Supplier cannot be null!', 'Invalid values');

    }
  }

  private openMoveProductDialog(purchase: PurchaseModel) {
    const dialogRef = this.dialog.open(MoveProductComponent, {
      width: '100%',
      data: purchase
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getPurchases();
        this.openPrintDialog(purchase.id);
      } else {
        this.getPurchases();
      }
    });
  }
  private openPrintDialog(id) {
    const dialogRef = this.dialog.open(PrintDlgComponent, {
      width: '300px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
