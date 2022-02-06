import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PurchaseViewComponent } from 'app/modules/purchase-management/components/purchase-view/purchase-view.component';
import { ToastrService } from 'ngx-toastr';
import { ImageLines, InventoryModel } from '../../models/inventory-model';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-update',
  templateUrl: './inventory-update.component.html',
  styleUrls: ['./inventory-update.component.css']
})
export class InventoryUpdateComponent implements OnInit {

  isBlock = false;
  isImageBlock = false;

  file: File;
  filePath: string;
  inventoryGroup: FormGroup;

  inventory = new InventoryModel();
  imageLines = new Array<ImageLines>();

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: InventoryModel,
    private inventoryService: InventoryService, private toastr: ToastrService, public dialogRef: MatDialogRef<PurchaseViewComponent>) { }

  ngOnInit(): void {
    this.createInventory();
    this.patchInventory(this.data);
  }

  createInventory() {
    this.inventoryGroup = this.fb.group({
      id: ['', Validators.required],
      purchaseId: ['', Validators.required],
      investorId: ['', Validators.required],
      name: ['', Validators.required],
      barcode: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [1, Validators.required],
      unitPrice: [0, Validators.required],
      recuttingCost: [0, Validators.required],
      certificateCost: [0, Validators.required],
      commissionCost: [0, Validators.required],
      exportCost: [0, Validators.required],
      measurement: ['', Validators.required],
      weight: ['', Validators.required],
      priceCode: ['', Validators.required],
      lastPriceCode: ['', Validators.required]
    });
  }

  patchInventory(data: InventoryModel) {
    this.imageLines = data.imageLines;
    this.inventoryGroup.patchValue({
      id: data.id,
      purchaseId: data.purchaseId,
      investorId: data.investorId,
      barcode: data.barcode,
      name: data.name,
      description: data.description,
      quantity: data.quantity,
      unitPrice: data.unitPrice,
      recuttingCost: data.recuttingCost,
      certificateCost: data.certificateCost,
      commissionCost: data.commissionCost,
      exportCost: data.exportCost,
      measurement: data.measurement,
      weight: data.weight,
      priceCode: data.priceCode,
      lastPriceCode: data.lastPriceCode
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.filePath = reader.result as string;
      };
    }
    event.target.value = null;
  }

  onImageUpload() {
    this.isImageBlock = true;
    this.inventoryService.uploadImage(this.file).subscribe(
      (result) => {
        this.isImageBlock = false;
        this.filePath = null;
        this.imageLines.push({ id: null, url: result.image, inventoryId: null, recordState: 0 });
        this.toastr.success('Success', 'Image Uploaded successfully!');
      },
      (error) => {
        this.isImageBlock = false;
        this.toastr.error(error, 'Failed to upload image!');
      }
    );
  }

  onRemoveImage() {
    this.filePath = null;
  }

  onRemoveSavedImage(index: number) {
    this.imageLines[index].recordState = 1;;
  }

  onUpdate() {
    this.isBlock = true;
    this.inventory = Object.assign({}, this.inventoryGroup.value, this.inventory);
    this.inventory.imageLines = this.imageLines;
    this.inventoryService.updateInventory(this.inventory).subscribe(
      (result) => {
        this.inventoryGroup.reset();
        this.imageLines = null;
        this.isBlock = false;
        this.close('refresh');
        this.toastr.success('Inventory Updated Successfully!', 'Success');
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to update inventory');
      }
    );
  }

  close(response: string) {
    this.dialogRef.close(response);
  }
}
