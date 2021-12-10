import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PromotionModel } from '../../models/promotion-model';
import { PromotionProductDescriptionModel, PromotionProductModel } from '../../models/promotion-product-model';
import { PromotionLinesModel } from '../../models/promotion-lines-model';
import { PromotionService } from '../../services/promotion.service';
import { PromotionProductService } from '../../services/promotion-product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-promotion-update',
  templateUrl: './promotion-update.component.html',
  styleUrls: ['./promotion-update.component.css']
})
export class PromotionUpdateComponent implements OnInit {

  productBlock = false;
  promotionBlock = false;
  previewDisplay = false;
  imageBlock = false;
  isUpdate = false;
  imageUploadSuccess = false;
  display = false;
  block = false;
  previewDisplayDescription = false;
  linesChange = false;
  promotionLineId: string;

  promotionForm: FormGroup;
  promotionLineForm: FormGroup;

  @Input() promotion: PromotionModel;
  promotionProduct = Array<PromotionProductModel>();
  descriptionLines = Array<PromotionProductDescriptionModel>();
  promotionLines = Array<PromotionLinesModel>();
  promotionLine = new PromotionLinesModel();

  file: File;
  filePath: string;

  updateId: number;
  @Output() updated = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private promotionService: PromotionService,
    private promotionProductService: PromotionProductService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createPromotionForm();
    this.createPromotionLineForm();
    this.patchPromotion(this.promotion);
    this.loadProducts();
    this.promotionLines = this.promotion.promotionLines;
  }

  createPromotionForm() {
    this.promotionForm = this.fb.group({
      id: ['', Validators.required],
      promotionImage: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [new Date, Validators.required],
      endDate: [new Date, Validators.required]
    });
  }

  createPromotionLineForm() {
    this.promotionLineForm = this.fb.group({
      id: [''],
      promotionId: [''],
      productId: ['', Validators.required],
      descriptionId: ['', Validators.required],
      discountPrice: ['', Validators.required],
      unitPrice: ['', Validators.required],
      quantity: ['', Validators.required]
    })
  }

  patchPromotion(promotion: PromotionModel): void {
    this.imageUploadSuccess = true;
    this.previewDisplay = true;
    this.promotionForm.patchValue({
      id: promotion.id,
      promotionImage: promotion.promotionImage,
      description: promotion.description,
      startDate: promotion.startDate,
      endDate: promotion.endDate
    });
  }

  openModal() {
    this.display = true;
  }

  closeModal() {
    this.display = false;
    this.previewDisplayDescription = false;
  }

  closePreviewDesModal() {
    this.previewDisplayDescription = false;
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
        this.toastr.error(error, 'Failed to upload the image!');
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
    this.linesChange = true;
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

  closePreviewModal() {
    this.previewDisplayDescription = false;
  }

  getPromotionLines(id: number) {
    this.isUpdate = true;
    this.updateId = id;
    const promo = this.promotionLines[id];
    this.promotionLineForm.patchValue({
      id: promo.id,
      productId: promo.productId,
      descriptionId: promo.descriptionId,
      promotionId: promo.promotionId,
      unitPrice: promo.unitPrice,
      quantity: promo.quantity,
      discountPrice: promo.discountPrice
    });
    this.descriptionLines = this.promotionProduct.find(p => p.id === promo.productId)?.descriptionLines;
    this.previewDisplayDescription = true;
    this.display = true;
  }

  onUpdatePromotion() {
    this.promotionBlock = false;
    this.promotionForm.setControl('promotionLines', new FormArray([]));
    this.promotionLines.forEach((i) => {
      const descriptionRow = new FormGroup({
        id: new FormControl(i.id),
        productId: new FormControl(i.productId),
        promotionId: new FormControl(i.promotionId),
        descriptionId: new FormControl(i.descriptionId),
        unitPrice: new FormControl(i.unitPrice),
        quantity: new FormControl(i.quantity),
        discountPrice: new FormControl(i.discountPrice)
      });
      (this.promotionForm.get('promotionLines') as FormArray).push(descriptionRow);
    });

    this.promotion = Object.assign({}, this.promotion, this.promotionForm.value);

    if (!this.linesChange && this.promotionForm.valueChanges) {
      const startDate = new Date(this.promotion.startDate);
      const endDate = new Date(this.promotion.endDate);
      this.promotion.startDate = startDate;
      this.promotion.endDate = endDate;

      this.promotion.startDate.setDate(this.promotion.startDate.getDate() + 1);
      this.promotion.endDate.setDate(this.promotion.endDate.getDate() + 1);
    }
    this.promotionService.updatePromotion(this.promotion).subscribe(
      (result) => {
        this.promotionBlock = false;
        this.display = false;
        this.previewDisplay = false;
        this.promotionForm.reset();
        this.promotionLines = new Array<PromotionLinesModel>();
        this.toastr.success('Promotion Updated Successfully!', 'Success');
        this.updated.emit();
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

}
