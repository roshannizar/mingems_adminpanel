import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryModel } from '../../../category-management/models/category-model';
import { CategoryService } from '../../../category-management/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from '../../models/product-model';
import { ProductDescriptionModel } from '../../models/product-description-model';
import { ProductService } from '../../services/product.service';
import { CATEGORIES } from '../../models/sequential_order_categories';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  productBlock = false;
  display = false;
  isUpdate = false;
  previewDisplay = false;
  imageUploadSuccess = false;
  imageBlock = false;
  updateId: number;
  categories: Array<CategoryModel>;
  descriptionLines = new Array<ProductDescriptionModel>();
  productForm: FormGroup;
  descriptionForm: FormGroup;
  @Input() product: ProductModel;
  @Output() updated = new EventEmitter();
  filePath: string;
  file: File;
  categoryName = '';
  categoryDescriptionLines: any[] = [];
  categoryDescriptionStrLines: any[] = [];
  specialCategory: any;
  newVal = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.createProductForm();
    this.createDescriptionForm();
    this.patchProduct(this.product);
    this.checkCategory(this.product)
    this.descriptionLines = this.product.descriptionLines;
    this.checkProgression();
  }

  checkCategory(product: ProductModel): void {
    const categoryName = product.category.name;
    CATEGORIES.forEach(cat => {
      if (cat.name === categoryName) {
        this.categoryName = cat.name;
        this.specialCategory = cat;
      }
    });
  }

  checkProgression(): void {
    if (this.categoryName !== '') {
      const categoryDetails = CATEGORIES.find(cat => cat.name === this.categoryName);
      this.descriptionLines.forEach(desc => {
        const metric = desc.name.split(' ');
        switch (metric[1].toLowerCase()) {
          case categoryDetails.primary:
            this.categoryDescriptionLines.push(+metric[0]);
            this.categoryDescriptionStrLines.push(desc.name);
            break;
          case categoryDetails.secondary:
            this.categoryDescriptionLines.push(+metric[0] * 1000);
            this.categoryDescriptionStrLines.push(+metric[0] * 1000 + ' ' + categoryDetails.primary);
            break;
        }
      });
      this.categoryDescriptionLines = this.categoryDescriptionLines.sort((num1, num2) => num1 - num2);
      this.categoryDescriptionStrLines = this.categoryDescriptionStrLines.sort((num1, num2) => {
        return parseInt(num1, 10) - parseInt(num2, 10);
      });
      console.log('list: ' + this.categoryDescriptionStrLines);
      // alert('lines: ' + this.categoryDescriptionLines);
    }
  }

  createProductForm() {
    this.productForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      longDescription: [''],
      categoryId: ['', Validators.required],
      descriptionLines: ['']
    });
  }

  createDescriptionForm() {
    this.descriptionForm = this.fb.group({
      /*id: ['', Validators.required],
      productId: ['', Validators.required],*/
      id: [''],
      productId: [''],
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      mrp: ['', Validators.required],
      quantity: ['', Validators.required],
      unitPrice: ['', Validators.required],
      recordState: [0]
    })
  }

  patchProduct(productModel: ProductModel) {
    this.productForm.patchValue({
      id: productModel.id,
      name: productModel.name,
      longDescription: productModel.longDescription,
      categoryId: productModel.categoryId,
    });
  }

  onImageUpload() {
    this.imageBlock = true;
    this.productService.uploadImage(this.file).subscribe(
      (result) => {
        this.imageBlock = false;
        this.imageUploadSuccess = true;
        this.filePath = result.image;
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
      id: descriptionModel.id,
      productId: descriptionModel.productId,
      name: descriptionModel.name,
      imageUrl: descriptionModel.imageUrl,
      mrp: descriptionModel.mrp,
      quantity: descriptionModel.quantity,
      unitPrice: descriptionModel.unitPrice
    });
    this.imageUploadSuccess = true;
    this.isUpdate = true;
    this.filePath = descriptionModel.imageUrl;
    this.display = true;
    this.previewDisplay = true;
  }

  onRemoveDescription(id: number) {
    this.descriptionLines[id].recordState = 2;
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

  openModal() {
    this.isUpdate = false;
    this.display = true;
  }

  closeModal() {
    this.display = false;
    this.previewDisplay = false;
    this.descriptionForm.reset();
    this.filePath = null;
    this.isUpdate = false;
    this.newVal = false;
    this.imageUploadSuccess = false;
  }

  closePreviewModal() {
    this.previewDisplay = false;
  }

  getCategories() {
    // this.block = true;
    this.categoryService.getCategories().subscribe(
      (result) => {
        // this.block = false;
        this.categories = result;
      },
      (error) => {
        // this.block = false;
        this.toastr.error(error.message, 'Failed to load Category');
      }
    );
  }

  /*updateCategory() {
    this.categoryBlock = true;
    this.product = Object.assign({}, this.category, this.categoryForm.value);
    this.categoryService.putCategory(this.category).subscribe(
        (result) => {
          this.categoryBlock = false;
          this.toastr.success('Category details updated successfully');
        },
        (error) => {
          this.categoryBlock = false;
          this.toastr.error("Failed to update category details");
        }
    );
  }*/
  onSaveDescription() {
    console.log('unit price: ' + this.descriptionForm.get('unitPrice').value);
    let productDescModel = new ProductDescriptionModel();
    productDescModel = Object.assign({}, productDescModel, this.descriptionForm.value);
    this.descriptionLines.push(productDescModel);
    this.descriptionForm.reset();
    this.display = false;
    this.previewDisplay = false;
    this.filePath = null;
    this.imageUploadSuccess = false;
    this.newVal = false;
    this.toastr.success('Added Successfully!', 'Success');
  }

  onUpdateDescription() {
    let productDescModel = new ProductDescriptionModel();
    productDescModel = Object.assign({}, productDescModel, this.descriptionForm.value);
    this.updateSequentialPrices(productDescModel);
    // this.updateSequentialMRP(productDescModel);
    this.descriptionLines[this.updateId] = productDescModel;
    this.descriptionForm.reset();
    this.display = false;
    this.previewDisplay = false;
    this.toastr.success('Updated Successfully!', 'Success');
    this.updateId = 0;
    this.filePath = null;
    this.imageUploadSuccess = false;
  }

  onUpdateProduct() {
    this.productBlock = false;
    this.productForm.setControl('descriptionLines', new FormArray([]));
    this.descriptionLines.forEach((i) => {
      const descriptionRow = new FormGroup({
        id: new FormControl(i.id),
        productId: new FormControl(i.productId),
        name: new FormControl(i.name),
        imageUrl: new FormControl(i.imageUrl),
        mrp: new FormControl(i.mrp),
        quantity: new FormControl(i.quantity),
        unitPrice: new FormControl(i.unitPrice),
        recordState: new FormControl(i.recordState ?? 0)
      });
      (this.productForm.get('descriptionLines') as FormArray).push(descriptionRow);
    });

    this.product = Object.assign({}, this.product, this.productForm.value);
    // this.updateProduct = Object.assign({}, this.updateProduct, this.product);

    this.productService.updateProduct(this.product).subscribe(
      (result) => {
        this.productBlock = false;
        this.categoryDescriptionLines = [];
        this.categoryDescriptionStrLines = [];
        this.categoryName = '';
        this.newVal = false;
        this.updated.emit();
        this.toastr.success('Product Updated Successfully!', 'Success');
      },
      (error) => {
        this.productBlock = false;
        this.categoryDescriptionLines = [];
        this.categoryDescriptionStrLines = [];
        this.categoryName = '';
        this.newVal = false;
        this.toastr.error(error.message, 'Failed to create product!');
      }
    );
  }

  // updating the unitPrice and MRP value of other product descriptions, based on the changed values
  updateSequentialPrices(productDescModel: ProductDescriptionModel): void {
    if (this.categoryName !== '') {
      const changedPrice = productDescModel.unitPrice;
      const changedMRP = productDescModel.mrp;
      const descName = productDescModel.name;
      let baseDescNumber = parseInt(descName, 10);
      baseDescNumber = baseDescNumber < 10 ? baseDescNumber * 1000 : baseDescNumber;
      this.descriptionLines.forEach((desc, i) => {
        if (desc.name !== productDescModel.name) {
          let curDescNumber = parseInt(desc.name, 10);
          curDescNumber = curDescNumber < 10 ? curDescNumber * 1000 : curDescNumber;
          // const factor = this.categoryDescriptionLines[i] / baseDescNumber;
          const factor = curDescNumber / baseDescNumber;
          /*console.log('desc name: ' + desc.name);
          console.log('productDescModel name: ' + productDescModel.name);
          console.log('i: ' + i);
          console.log('category no.: ' + curDescNumber);
          console.log('baseDescNumber: ' + baseDescNumber);
          console.log('factor: ' + factor);*/
          desc.unitPrice = Math.ceil(changedPrice * factor);
          desc.mrp = Math.ceil(changedMRP * factor);
        }
      });
    }
  }


  setUnitPrice(): void {
    if (this.categoryName !== '' && !this.isUpdate) {
      this.newVal = true;
    }
  }

  calculateUnitPrice(): void {
    if (this.categoryName !== '' && !this.isUpdate) {
      const prevLowest = this.categoryDescriptionLines[0];
      console.log('prevLowest: ' + prevLowest);
      const name = this.descriptionForm.get('name').value;
      const intVal = this.extractNumber(name);

      const result = this.categoryDescriptionLines.filter(val => val === intVal);
      if (result.length === 0) {
        this.categoryDescriptionLines.push(intVal);
        this.categoryDescriptionStrLines.push(name);
      } else {
        this.descriptionForm.get('name').setErrors({ notUnique: true });
      }

      this.categoryDescriptionLines = this.categoryDescriptionLines.sort((num1, num2) => num1 - num2);
      this.categoryDescriptionStrLines = this.categoryDescriptionStrLines.sort((num1, num2) => {
        return parseInt(num1, 10) - parseInt(num2, 10);
      });

      console.log('categoryDescriptionLines: ' + this.categoryDescriptionLines);
      // const lowest = this.descriptionLines.find(desc => parseInt(desc.name, 10) === prevLowest);
      const lowest = this.descriptionLines.reduce((prev, cur) => {
        const intPrevVal = this.extractNumber(prev.name);
        const intCurVal = this.extractNumber(cur.name);
        return intPrevVal < intCurVal ?
          prev :
          cur;
      });
      console.log('lowest price: ' + lowest.unitPrice);
      const lowestPrice = lowest.unitPrice;
      const intLowestVal = this.extractNumber(lowest.name);
      // const factor = intVal / parseInt(lowest.name, 10);
      // const factor = intVal / parseInt(removedLowest, 10);
      const factor = intVal / intLowestVal;
      console.log('factor: ' + factor);
      let adjustedPrice = lowestPrice * factor;
      adjustedPrice = Math.ceil(adjustedPrice);
      this.descriptionForm.get('unitPrice').setValue(adjustedPrice);

    }
  }

  changeCategory(): void {
    const categoryId = this.productForm.get('categoryId').value;
    const categoryList = this.categories.filter(cat => cat.id === categoryId);
    const categoryName = categoryList[0].name;
    console.log('category name: ' + categoryName);
    const result = CATEGORIES.filter(cat => cat.name === categoryName);
    if (result.length === 0) {
      this.categoryDescriptionLines = [];
      this.categoryDescriptionStrLines = [];
      this.categoryName = '';
      this.specialCategory = {};
      this.newVal = false;
    } else {
      this.categoryName = categoryName;
      this.specialCategory = result[0];
      this.checkProgression();
      this.updateProductDescriptionPrices();
    }
  }

  updateProductDescriptionPrices(): void {
    const baseDesc = this.categoryDescriptionStrLines[0];
    const baseDescLine = this.descriptionLines.find(desc => desc.name === baseDesc);
    const baseNumber = parseInt(baseDescLine.name, 10);
    const basePrice = baseDescLine.unitPrice;
    this.descriptionLines.forEach(desc => {
      const description = parseInt(desc.name, 10);
      const factor = description / baseNumber;
      desc.unitPrice = basePrice * factor;
    });
  }

  extractNumber(name: string): number {
    let removedNumbers = name.replace(/[0-9]/g, '');
    removedNumbers = removedNumbers.replace(' ', '');

    // test for primary or secondary
    const isPrimary = (removedNumbers.toLowerCase() === this.specialCategory.primary);
    const isSecondary = (removedNumbers.toLowerCase() === this.specialCategory.secondary);

    const intVal = isPrimary ? parseInt(name, 10) :
      isSecondary ? parseInt(name, 10) * 1000 : 0;

    return intVal;
  }

}
