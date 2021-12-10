import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'app/modules/product-management/models/category-model';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {

  block = false;
  display = false;
  categories: Array<CategoryModel>;
  viewCategories: Array<CategoryModel>;
  category: CategoryModel;
  heading_text: string;
  search: string;
  isUpdate = false;
  isDelete = false;

  constructor(private categoryService: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  openCreateModal() {
    this.category = null;
    this.display = true;
    this.isUpdate = false;
    this.isDelete = false;
    this.heading_text = 'Create Category';
  }

  openCategoryDlgModal(category: CategoryModel) {
    this.category = category;
    this.display = true;
    this.isUpdate = false;
    this.isDelete = false;
    this.heading_text = 'View Category Details';
  }

  openCategoryEdit(category: CategoryModel) {
    this.category = category;
    this.display = true;
    this.isUpdate = true;
    this.isDelete = false;
    this.heading_text = 'Edit Category Details';
  }

  openDeleteModal(category: CategoryModel) {
    this.isDelete = true;
    this.category = category;
    this.display = true;
    this.isUpdate = false;
    this.heading_text = `Delete ${category.name}`;
  }

  closeModal() {
    this.display = false;
    this.category = null;
    this.isUpdate = false;
    this.isDelete = false;
  }

  getCategories() {
    this.block = true;
    this.categoryService.getCategories().subscribe(
      (result) => {
        this.categories = result;
        this.viewCategories = result;
        this.block = false;
      },
      (error) => {
        this.block = false;
        this.toastr.error(error.message, 'Failed to load categories');
      }
    );
  }

  filterCategory() {
    if (this.search !== '') {
      // this.categories = this.categories.filter(c => c.name.toLowerCase().match(this.search.toLowerCase()));
      this.viewCategories = this.categories.filter(c => c.name.toLowerCase().match(this.search.toLowerCase()));
    } else {
      this.getCategories();
    }
  }

  refresh(): void {
    this.closeModal();
    this.getCategories();
  }
}
