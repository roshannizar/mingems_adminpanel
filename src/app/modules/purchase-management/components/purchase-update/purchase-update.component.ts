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
  lock = false;
  remainingAmount = 0;
  enableAmount = false;
  isBlockExtra = false;
  previousInvestorId = null;

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
      supplierId: purchase.supplier !== null ? purchase.supplierId : null,
      investorId: purchase.investment !== null ? purchase.investorId : null,
      unitPrice: purchase.unitPrice,
      exportCost: purchase.exportCost
    });
    this.previousInvestorId = purchase.investorId;
  }

  getInvestors() {
    this.isBlockExtra = true;
    this.purchaseInvestorService.getInvestors().subscribe(
      (result) => {
        this.investors = result;
        this.activateAmount(this.data.investorId);
        this.isBlockExtra = false;
      },
      (error) => {
        this.isBlockExtra = false;
        this.toastrService.error(error.message, 'Failed to load investors for purchase');
      }
    );
  }

  getSuppliers() {
    this.isBlockExtra = true;
    this.purchaseSupplierService.getSuppliers().subscribe(
      (result) => {
        this.suppliers = result;
        this.isBlockExtra = false;
      },
      (error) => {
        this.isBlockExtra = false;
        this.toastrService.error(error.message, 'Failed to load suppliers for purchase');
      }
    );
  }

  onUpdate() {
    this.isBlock = true;
    this.purchase = Object.assign({}, this.purchase, this.purchaseGroup.value);
    this.purchase.previousInvestorId = this.previousInvestorId;
    this.purchaseService.updatePurchase(this.purchase).subscribe(
      (result) => {
        this.isBlock = false;
        this.close('refresh');
        this.toastrService.success('Purchase updated successfully!', 'Success');
      },
      (error) => {
        this.isBlock = false;
        this.toastrService.error(error.message, 'Failed to update purchases');
      }
    );
  }

  activateAmount(event) {
    if (event) {
      this.enableAmount = true;
      const tempInvestor = this.investors.find(i => i.id === event);
      this.remainingAmount = tempInvestor.remainingAmount;

      if (this.previousInvestorId !== event) {
        this.reduceAmount();
      }
    } else {
      this.enableAmount = false;
    }
  }

  reduceAmount() {
    const value = this.purchaseGroup.get('unitPrice').value;
    const investorId = this.purchaseGroup.get('investorId').value
    const investorAmount = this.investors.find(i => i.id === investorId);

    if (this.remainingAmount >= 0) {
      const tempValue = investorAmount.remainingAmount - value;

      if (tempValue <= 0) {
        this.toastrService.warning('Investor amount balance exceeded');
        this.remainingAmount = investorAmount.remainingAmount;
        this.purchaseGroup.get('unitPrice').setValue(0);
      } else {
        this.remainingAmount = investorAmount.remainingAmount - value;
      }
    } else {
      this.toastrService.warning('Investor amount balance exceeded');
      this.remainingAmount = investorAmount.remainingAmount;
      this.purchaseGroup.get('unitPrice').setValue(0);
    }

    if (this.previousInvestorId === investorAmount.id && !this.lock) {
      this.remainingAmount = investorAmount.remainingAmount + this.data.unitPrice;
      investorAmount.remainingAmount = this.remainingAmount;
      this.purchaseGroup.get('unitPrice').setValue(0);
      this.lock = true;
    }
  }

  close(response: string) {
    this.dialogRef.close(response);
  }
}
