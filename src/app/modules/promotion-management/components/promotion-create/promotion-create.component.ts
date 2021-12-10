import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PromotionLinesModel } from '../../models/promotion-lines-model';
import { PromotionModel } from '../../models/promotion-model';
import { PromotionProductDescriptionModel, PromotionProductModel } from '../../models/promotion-product-model';
import { PromotionProductService } from '../../services/promotion-product.service';
import { PromotionService } from '../../services/promotion.service';

@Component({
  selector: 'app-promotion-create',
  templateUrl: './promotion-create.component.html',
  styleUrls: ['./promotion-create.component.css']
})
export class PromotionCreateComponent implements OnInit {

  productBlock = false;
  promotionBlock = false;
  previewDisplay = false;
  imageBlock = false;
  isUpdate = false;
  imageUploadSuccess = false;
  display = false;
  block = false;
  previewDisplayDescription = false;
  @Output() notify: EventEmitter<any> = new EventEmitter();

  promotionForm: FormGroup;
  promotionLineForm: FormGroup;

  control = new FormControl();

  promotion = new PromotionModel();
  promotionProduct = Array<PromotionProductModel>();
  descriptionLines = Array<PromotionProductDescriptionModel>();
  promotionLines = Array<PromotionLinesModel>();
  promotionLine = new PromotionLinesModel();

  file: File;
  filePath: string;

  updateId: number;

  constructor(private fb: FormBuilder, private promotionService: PromotionService,
    private promotionProductService: PromotionProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createPromotionForm();
    this.createPromotionLineForm();
    this.loadProducts();
  }

  createPromotionForm() {
    this.promotionForm = this.fb.group({
      promotionImage: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  createPromotionLineForm() {
    this.promotionLineForm = this.fb.group({
      productId: ['', Validators.required],
      descriptionId: ['', Validators.required],
      discountPrice: ['', Validators.required],
      unitPrice: ['', Validators.required],
      quantity: ['', Validators.required]
    })
  }

  openModal() {
    this.display = true;
  }

  closeModal() {
    this.display = false;
    this.previewDisplayDescription = false;
  }

  closePreviewDesModal() {
    this.previewDisplayDescription = true;
  }

  loadProducts() {
    this.productBlock = true;
    this.promotionProductService.getProducts().subscribe(
      (result) => {
        this.promotionProduct = result;
        this.productBlock = false;
      },
      (error) => {
        this.productBlock = false;
        this.toastr.error(error.message, 'Failed to load products');
      }
    );
  }

  onChangeProduct() {
    this.productBlock = true;
    const id = this.promotionLineForm.get('productId').value
    this.descriptionLines = this.promotionProduct.find(p => p.id === id)?.descriptionLines;
    this.productBlock = false;
    this.previewDisplayDescription = true;
  }

  onChangeDescription() {
    const productId = this.promotionLineForm.get('productId').value
    const id = this.promotionLineForm.get('descriptionId').value;
    const unitPrice = this.promotionProduct.find(p => p.id === productId)?.descriptionLines.find(d => d.id === id);
    this.promotionLineForm.get('unitPrice').setValue(unitPrice.mrp);
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.filePath = reader.result as string;
        this.previewDisplay = true;
      };
    }
  }

  uploadImage() {
    this.imageBlock = true;
    this.promotionService.uploadImage(this.file).subscribe(
      (result) => {
        this.filePath = result.image;
        this.promotionForm.get('promotionImage').setValue(result.image);
        this.imageBlock = false;
        this.imageUploadSuccess = true;
        this.toastr.success('Image uploaded successfully!');
      },
      (error) => {
        this.imageBlock = false;
        this.imageUploadSuccess = true;
        this.toastr.error('Failed', 'Failed to upload the image!');
      }
    );
  }

  removeImage() {
    this.imageUploadSuccess = false;
  }

  onSaveLines() {
    this.promotionLine = Object.assign({}, this.promotionLine, this.promotionLineForm.value);
    this.promotionLine.product.name = this.promotionProduct.find(p => p.id === this.promotionLine.productId)?.name;
    this.promotionLines.push(this.promotionLine);
    this.toastr.success('Added Successfully!', 'Success');
    this.display = false;
    this.previewDisplayDescription = false;
    this.promotionLineForm.reset();
  }

  onUpdateLines() {
    this.promotionLine = Object.assign({}, this.promotionLine, this.promotionLineForm.value);
    this.promotionLine.product.name = this.promotionProduct.find(p => p.id === this.promotionLine.productId)?.name;
    this.promotionLines[this.updateId] = this.promotionLine;
    this.toastr.success('Updated Successfully!', 'Success');
    this.display = false;
    this.previewDisplayDescription = false;
    this.isUpdate = false;
    this.promotionLineForm.reset();
  }

  onRemoveLines(id: number) {
    this.promotionLines.splice(id, 1);
    this.toastr.success('Removed Successfully!', 'Success');
  }

  getPromotionLines(id: number) {
    this.isUpdate = true;
    this.updateId = id;
    const promo = this.promotionLines[id];
    this.promotionLineForm.patchValue({
      productId: promo.productId,
      descriptionId: promo.descriptionId,
      unitPrice: promo.unitPrice,
      quantity: promo.quantity,
      discountPrice: promo.discountPrice
    });
    this.previewDisplayDescription = true;
    this.display = true;
  }

  onSavePromotion() {
    this.promotionBlock = true;
    this.promotionForm.setControl('promotionLines', new FormArray([]));
    this.promotionLines.forEach((i) => {
      const descriptionRow = new FormGroup({
        productId: new FormControl(i.productId),
        descriptionId: new FormControl(i.descriptionId),
        unitPrice: new FormControl(i.unitPrice),
        quantity: new FormControl(i.quantity),
        discountPrice: new FormControl(i.discountPrice)
      });
      (this.promotionForm.get('promotionLines') as FormArray).push(descriptionRow);
    });

    this.promotion = Object.assign({}, this.promotion, this.promotionForm.value);
    this.promotion.startDate.setDate(this.promotion.startDate.getDate() + 1);
    this.promotion.endDate.setDate(this.promotion.endDate.getDate() + 1);
    this.promotionService.createPromotion(this.promotion).subscribe(
      (result) => {
        this.promotionBlock = false;
        this.display = false;
        this.previewDisplay = false;
        this.promotionForm.reset();
        this.notify.emit();
        this.promotionLines = new Array<PromotionLinesModel>();
        this.toastr.success('Promotion Created Successfully!', 'Success');
      },
      (error) => {
        this.promotionBlock = false;
        this.previewDisplay = false;
        this.promotion.startDate.setDate(this.promotion.startDate.getDate() - 1);
        this.promotion.endDate.setDate(this.promotion.endDate.getDate() - 1);
        this.toastr.error(error.message, 'Failed to create promotion!');
      }
    );
  }

  displayFn(product: PromotionProductModel): string {
    return product && product?.name ? product?.name : '';
  }
}
