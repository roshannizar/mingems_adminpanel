import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageLines, InventoryModel } from 'app/modules/inventory-management/models/inventory-model';
import { InventoryService } from 'app/modules/inventory-management/services/inventory.service';
import { ToastrService } from 'ngx-toastr';
import { stringify } from 'querystring';
import { PurchaseViewComponent } from '../../components/purchase-view/purchase-view.component';
import { PurchaseModel } from '../../model/purchase-model';

@Component({
  selector: 'app-move-product',
  templateUrl: './move-product.component.html',
  styleUrls: ['./move-product.component.css']
})
export class MoveProductComponent implements OnInit {

  isBlock = false;
  isImageBlock = false;

  file: File;
  filePath: string;
  inventoryGroup: FormGroup;

  inventory = new InventoryModel();
  imageLines = new Array<ImageLines>();

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: PurchaseModel,
    private inventoryService: InventoryService, private toastr: ToastrService, public dialogRef: MatDialogRef<PurchaseViewComponent>) { }

  ngOnInit(): void {
    this.createInventory(this.data);
  }

  createInventory(data: PurchaseModel) {
    this.inventoryGroup = this.fb.group({
      name: data.name,
      description: data.description,
      quantity: [1, Validators.required],
      unitPrice: data.unitPrice,
      investorId: data.investorId,
      purchaseId: data.id,
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
    this.imageLines.splice(index, 1);
  }

  onSave() {
    this.isBlock = true;
    this.inventory = Object.assign({}, this.inventoryGroup.value, this.inventory);
    this.inventory.imageLines = this.imageLines;
    this.inventoryService.createInventory(this.inventory).subscribe(
      (result) => {
        this.inventoryGroup.reset();
        this.imageLines = null;
        this.isBlock = false;
        this.close('refresh');
        this.toastr.success('Inventory Moved Successfully!', 'Success');
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to move inventory');
      }
    );
  }

  close(response: string) {
    this.dialogRef.close(response);
  }
}
