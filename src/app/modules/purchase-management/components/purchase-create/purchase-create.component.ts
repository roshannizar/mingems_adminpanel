import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PurchaseInvestorModel, PurchaseModel, PurchaseSupplierModel } from '../../model/purchase-model';
import { PurchaseInvestorService } from '../../services/purchase-investor.service';
import { PurchaseSupplierService } from '../../services/purchase-supplier.service';
import { PurchaseService } from '../../services/purchase.service';
import { PurchaseViewComponent } from '../purchase-view/purchase-view.component';

@Component({
  selector: 'app-purchase-create',
  templateUrl: './purchase-create.component.html',
  styleUrls: ['./purchase-create.component.css']
})
export class PurchaseCreateComponent implements OnInit {

  isBlock = false;

  purchaseGroup: FormGroup;

  purchase = new PurchaseModel();
  investors = new Array<PurchaseInvestorModel>();
  suppliers = new Array<PurchaseSupplierModel>();

  constructor(private fb: FormBuilder, private toastrService: ToastrService,
    private purchaseInvestorService: PurchaseInvestorService,
    private purchaseSupplierService: PurchaseSupplierService,
    private purchaseService: PurchaseService, public dialogRef: MatDialogRef<PurchaseViewComponent>) { }

  ngOnInit(): void {
    this.createPurchaseGroup();
    this.getInvestors();
    this.getSuppliers();
  }

  createPurchaseGroup() {
    this.purchaseGroup = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      investorId: ['', Validators.required],
      unitPrice: [0, Validators.required],
      supplierId: ['', Validators.required],
      exportCost: [0, Validators.required]
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

  onSave() {
    this.isBlock = true;
    this.purchase = Object.assign({}, this.purchase, this.purchaseGroup.value);
    this.purchaseService.createPurchase(this.purchase).subscribe(
      (result) => {
        this.isBlock = false;
        this.toastrService.success('Purchase saved successfully!', 'Success');
      },
      (error) => {
        this.isBlock = false;
        this.toastrService.error(error.message, 'Failed to save purchase');
      }
    );
  }

  close() {
    this.dialogRef.close();
  }
}
