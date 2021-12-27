import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PurchaseModel } from '../../model/purchase-model';
import { PurchaseService } from '../../services/purchase.service';
import { PurchaseCreateComponent } from '../purchase-create/purchase-create.component';

@Component({
  selector: 'app-purchase-view',
  templateUrl: './purchase-view.component.html',
  styleUrls: ['./purchase-view.component.css']
})
export class PurchaseViewComponent implements OnInit {

  isBlock = false;

  purchases = new Array<PurchaseModel>();

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
    });
  }
}
