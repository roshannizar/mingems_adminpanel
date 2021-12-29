import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
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

  heading_text = 'View Purchase'

  purchases = new Array<PurchaseModel>();
  purchase = new PurchaseModel();

  constructor(private dialog: MatDialog, private purchaseService: PurchaseService,
    private toastrService: ToastrService) { }

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
        this.toastrService.error(error.message, 'Failed to load purchases');
      }
    );
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(PurchaseCreateComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPurchases();
    });
  }

  openUpdateDialog(purchase: PurchaseModel) {
    const dialogRef = this.dialog.open(PurchaseUpdateComponent, {
      width: '800px',
      data: purchase
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPurchases();
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
}
