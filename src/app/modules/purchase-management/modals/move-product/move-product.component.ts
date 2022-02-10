import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryService } from 'app/modules/inventory-management/services/inventory.service';
import { PrivateCodeModel } from 'app/modules/private-code-management/models/private-code-model';
import { PrivateCodeService } from 'app/modules/private-code-management/services/private.code.service';
import { ToastrService } from 'ngx-toastr';
import { stringify } from 'querystring';
import { PurchaseViewComponent } from '../../components/purchase-view/purchase-view.component';
import { ImageLines, PurchaseModel } from '../../model/purchase-model';

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

  inventory = new PurchaseModel();
  imageLines = new Array<ImageLines>();
  privateCodes = new Array<PrivateCodeModel>();

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: PurchaseModel,
    private inventoryService: InventoryService, private toastr: ToastrService, public dialogRef: MatDialogRef<PurchaseViewComponent>, private privateCodeService: PrivateCodeService) { }

  ngOnInit(): void {
    this.getPrivateCodees();
    this.createInventory(this.data);
  }

  createInventory(data: PurchaseModel) {
    this.inventoryGroup = this.fb.group({
      id: data.id,
      name: data.name,
      description: data.description,
      quantity: [1, Validators.required],
      unitPrice: data.unitPrice,
      investorId: data.investorId,
      recuttingCost: [0, Validators.required],
      certificateCost: [0, Validators.required],
      commissionCost: [0, Validators.required],
      exportCost: data.exportCost,
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
    this.isBlock = true;
    this.inventoryService.uploadImage(this.file).subscribe(
      (result) => {
        this.isImageBlock = false;
        this.isBlock = false;
        this.filePath = null;
        this.imageLines.push({ id: null, url: result.image, purchaseId: null, recordState: 0 });
        this.toastr.success('Success', 'Image Uploaded successfully!');
      },
      (error) => {
        this.isImageBlock = false;
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to upload image!');
      }
    );
  }

  onRemoveImage() {
    this.filePath = null;
  }

  onRemoveSavedImage(index: number) {
    this.imageLines.splice(index, 1);
  }

  getPrivateCodees() {
    this.isBlock = true;
    this.privateCodeService.getPrivateCodes().subscribe(
      (result) => {
        this.privateCodes = result;
        this.isBlock = false;
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to load Private Codes');
      }
    );
  }

  onSave() {
    this.isBlock = true;
    this.inventory = Object.assign({}, this.inventoryGroup.value, this.inventory);
    this.inventory.imageLines = this.imageLines;
    this.inventoryService.updateInventory(this.inventory).subscribe(
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
