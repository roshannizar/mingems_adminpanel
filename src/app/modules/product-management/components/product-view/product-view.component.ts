import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/product-model';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {ProductDescriptionModel} from '../../models/product-description-model';
import {ProductDescriptionService} from '../../services/product-description.service';
import {CategoryModel} from '../../models/category-model';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  block = false;
  display = false;
  fullProduct = false;
  panelOpenState = false;
  products = Array<ProductModel>();
  viewProducts = Array<ProductModel>();
  product: ProductModel;
  heading_text: string;
  search: string;
  isUpdate = false;
  isDelete = false;

  constructor(
      private productService: ProductService,
      private productDescriptionService: ProductDescriptionService,
      private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  openDetailModal(product: ProductModel) {
    this.product = product;
    this.display = true;
    this.isDelete = false;
    this.isUpdate = false;
    this.heading_text = 'View Product Description Details';
  }

  openCreateModal() {
    this.heading_text = 'Create Product Details';
    this.display = true;
  }

  openProductModal(product: ProductModel) {
    this.product = product;
    this.heading_text = 'View Product Details';
    this.display = true;
    this.fullProduct = true;
  }

  closeModal() {
    this.display = false;
    this.fullProduct = false;
    this.product = null;
    this.isUpdate = false;
    this.isDelete = false;
  }

  getProducts() {
    this.block = true;
    this.productService.getProducts().subscribe(
      (result) => {
        this.block = false;
        this.products = result;
        this.viewProducts = result;
      },
      (error) => {
        this.block = false;
        this.toastr.error(error.message, 'Failed to load products!');
      }
    );
  }

  // moving to out-of-stock section
  toggleChange(val: ProductDescriptionModel): void {
    val.quantity = 0;
    this.closeModal();
    this.productDescriptionService.moveToOutOfStock(val).subscribe((result) => {
      this.toastr.success(`The product description ${val.name} went out-of-stock`);
      this.getProducts();
    }, (error) => {
      this.block = false;
      this.getProducts();
      this.toastr.error(error.message, 'Failed to move out of stock!');
    });
  }

  filterProduct() {
    if (this.search !== '') {
      this.viewProducts = this.products.filter(p => p.name.toLowerCase().match(this.search.toLowerCase()));
    } else {
      this.getProducts();
    }
  }

  deleteProduct(id: string) {
    this.block = true;
    this.productService.deleteProduct(id).subscribe(
      (result) => {
        this.block = false;
        this.toastr.success('Deleted Successfully!', 'Success');
        this.getProducts();
      },
      (error) => {
        this.block = false;
        this.toastr.error(error.message, 'Failed');
      }
    );
  }

  openProductEdit(product: ProductModel) {
    this.product = product;
    this.display = true;
    this.isUpdate = true;
    this.isDelete = false;
    this.heading_text = 'Edit Product Details';
  }

  openDeleteModal(product: ProductModel) {
    this.isDelete = true;
    this.product = product;
    this.display = true;
    this.isUpdate = false;
    this.heading_text = `Delete ${product.name}`;
  }

  updatedModal(): void {
    this.closeModal();
    this.getProducts();
  }
}
