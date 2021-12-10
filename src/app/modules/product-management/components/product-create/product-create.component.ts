import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryModel } from '../../models/category-model';
import { ProductCategoryService } from '../../services/product-category.service';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductDescriptionModel } from '../../models/product-description-model';
import { ProductService } from '../../services/product.service';
import { CreateProductModel } from '../../models/create-product-model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  block = false;
  display = false;
  imageBlock = false;
  previewDisplay = false;
  imageUploadSuccess = false;
  productBlock = false;
  isUpdate = false;
  updateId: number;
  categories: Array<CategoryModel>;
  descriptionLines = new Array<ProductDescriptionModel>();
  product: CreateProductModel;
  productForm: FormGroup;
  descriptionForm: FormGroup;
  filePath: string;
  file: File;
  @Output() created = new EventEmitter();

  constructor(private fb: FormBuilder, private categoryService: ProductCategoryService,
    private toastr: ToastrService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getCategory();
    this.createProductForm();
    this.createDescriptionForm();
  }

  createProductForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      longDescription: [''],
      creationDate: Date.now
    })
  }

  createDescriptionForm() {
    this.descriptionForm = this.fb.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      mrp: ['', Validators.required],
      quantity: ['', Validators.required],
      unitPrice: ['', Validators.required],
    })
  }

  openModal() {
    this.display = true;
  }

  closeModal() {
    this.display = false;
    this.previewDisplay = false;
    this.descriptionForm.reset();
    this.filePath = null;
    this.isUpdate = false;
    this.imageUploadSuccess = false;
  }

  closePreviewModal() {
    this.previewDisplay = false;
  }

  getCategory() {
    this.block = true;
    this.categoryService.getCategory().subscribe(
      (result) => {
        this.block = false;
        this.categories = result;
      },
      (error) => {
        this.block = false;
        this.toastr.error(error.message, 'Failed to load Category');
      }
    );
  }

  onSaveDescription() {
    let productDescModel = new ProductDescriptionModel();
    productDescModel = Object.assign({}, productDescModel, this.descriptionForm.value);
    this.descriptionLines.push(productDescModel);
    this.descriptionForm.reset();
    this.display = false;
    this.previewDisplay = false;
    this.filePath = null;
    this.imageUploadSuccess = false;
    this.toastr.success('Added Successfully!', 'Success');
  }

  onRemoveDescription(id: number) {
    this.descriptionLines.splice(id, 1);
    this.toastr.success('Removed Successfully', 'Success');
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
        this.descriptionForm.get('imageUrl').setValue(file.name);
      };
    }
  }

  onImageUpload() {
    this.imageBlock = true;
    this.productService.uploadImage(this.file).subscribe(
      (result) => {
        this.imageBlock = false;
        this.filePath = result.image;
        this.imageUploadSuccess = true;
        this.descriptionForm.get('imageUrl').setValue(result.image);
        this.toastr.success('Success', 'Image Uploaded successfully!');
      },
      (error) => {
        this.imageBlock = false;
        this.toastr.error(error, 'Failed to upload image!');
      }
    );
  }

  onRemoveImage() {
    this.imageUploadSuccess = false;
    this.previewDisplay = false;
    this.filePath = null;
    this.descriptionForm.get('imageUrl').setValue(null);
    this.toastr.success('Success', 'Image Removed successfully!');
  }

  getDescription(id: number) {
    this.updateId = id;
    const descriptionModel = this.descriptionLines[id];
    this.descriptionForm.patchValue({
      name: descriptionModel.name,
      imageUrl: descriptionModel.imageUrl,
      mrp: descriptionModel.mrp,
      quantity: descriptionModel.quantity,
      unitPrice: descriptionModel.unitPrice
    });
    this.isUpdate = true;
    this.filePath = descriptionModel.imageUrl;
    this.display = true;
    this.previewDisplay = true;
  }

  onUpdateDescription() {
    let productDescModel = new ProductDescriptionModel();
    productDescModel = Object.assign({}, productDescModel, this.descriptionForm.value);
    this.descriptionLines[this.updateId] = productDescModel;
    this.descriptionForm.reset();
    this.display = false;
    this.previewDisplay = false;
    this.toastr.success('Updated Successfully!', 'Success');
    this.updateId = 0;
    this.filePath = null;
    this.imageUploadSuccess = false;
  }

  onSaveProduct() {
    this.productBlock = false;
    this.productForm.setControl('descriptionLines', new FormArray([]));
    this.descriptionLines.forEach((i) => {
      const descriptionRow = new FormGroup({
        name: new FormControl(i.name),
        imageUrl: new FormControl(i.imageUrl),
        mrp: new FormControl(i.mrp),
        quantity: new FormControl(i.quantity),
        unitPrice: new FormControl(i.unitPrice)
      });
      (this.productForm.get('descriptionLines') as FormArray).push(descriptionRow);
    });

    this.product = Object.assign({}, this.product, this.productForm.value);

    this.productService.createProduct(this.product).subscribe(
      (result) => {
        this.productBlock = false;
        this.created.emit();
        this.toastr.success('Product Created Successfully!', 'Success');
      },
      (error) => {
        this.productBlock = false;
        this.toastr.error(error.message, 'Failed to create product!');
      }
    );
  }
}
