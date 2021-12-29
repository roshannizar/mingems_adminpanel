import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PurchaseInvestorModel, PurchaseModel, PurchaseSupplierModel } from '../../model/purchase-model';
import { PurchaseInvestorService } from '../../services/purchase-investor.service';
import { PurchaseSupplierService } from '../../services/purchase-supplier.service';
import { PurchaseService } from '../../services/purchase.service';
import { PurchaseViewComponent } from '../purchase-view/purchase-view.component';

@Component({
  selector: 'app-purchase-update',
  templateUrl: './purchase-update.component.html',
  styleUrls: ['./purchase-update.component.css']
})
export class PurchaseUpdateComponent implements OnInit {

  isBlock = false;

  purchaseGroup: FormGroup;

  purchase = new PurchaseModel();

  investors = new Array<PurchaseInvestorModel>();
  suppliers = new Array<PurchaseSupplierModel>();


  constructor(private fb: FormBuilder, private toastrService: ToastrService,
    private purchaseInvestorService: PurchaseInvestorService,
    private purchaseSupplierService: PurchaseSupplierService,
    private purchaseService: PurchaseService, public dialogRef: MatDialogRef<PurchaseViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PurchaseModel) { }

  ngOnInit(): void {
    this.createPurchaseGroup();
    this.patchPurchase(this.data);
    this.getInvestors();
    this.getSuppliers();
  }

  createPurchaseGroup() {
    this.purchaseGroup = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      investorId: ['', Validators.required],
      unitPrice: [0, Validators.required],
      supplierId: ['', Validators.required],
      exportCost: [0, Validators.required]
    });
  }

  patchPurchase(purchase: PurchaseModel) {
    this.purchaseGroup.patchValue({
      id: purchase.id,
      name: purchase.name,
      description: purchase.description,
      supplierId: purchase.supplierId,
      investorId: purchase.investorId,
      unitPrice: purchase.unitPrice,
      exportCost: purchase.exportCost
    });
  }

  getInvestors() {
    this.isBlock = true;
    this.purchaseInvestorService.getInvestors().subscribe(
      (result) => {
        this.investors = result;
        this.isBlock = false;
      },
      (error) => {
        this.isBlock = false;
        this.toastrService.error(error.message, 'Failed to load investors for purchase');
      }
    );
  }

  getSuppliers() {
    this.isBlock = true;
    this.purchaseSupplierService.getSuppliers().subscribe(
      (result) => {
        this.suppliers = result;
        this.isBlock = false;
      },
      (error) => {
        this.isBlock = false;
        this.toastrService.error(error.message, 'Failed to load suppliers for purchase');
      }
    );
  }

  onUpdate() {
    this.isBlock = true;
    this.purchase = Object.assign({}, this.purchase, this.purchaseGroup.value);
    this.purchaseService.updatePurchase(this.purchase).subscribe(
      (result) => {
        this.isBlock = false;
        this.dialogRef.close();
        this.toastrService.success('Purchase updated successfully!', 'Success');
      },
      (error) => {
        this.isBlock = false;
        this.toastrService.error(error.message, 'Failed to update purchases');
      }
    );
  }
}
