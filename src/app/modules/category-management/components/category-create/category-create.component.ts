import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel } from '../../models/category-model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  categoryBlock = false;
  categoryForm: FormGroup;
  categoryModel: CategoryModel;
  @Output() created = new EventEmitter();

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createCategoryForm();
  }

  createCategoryForm() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      isTentative: [false]
    });
  }

  onSaveCategory() {
    this.categoryBlock = true;
    this.categoryModel = Object.assign({}, this.categoryModel, this.categoryForm.value);
    this.categoryService.createCategory(this.categoryModel).subscribe(
      (result) => {
        this.categoryBlock = false;
        this.created.emit();
        this.toastr.success('Created successfully!', 'Success');
      },
      (error) => {
        this.categoryBlock = false;
        this.toastr.error(error.message, 'Failed to create category');
      }
    );
  }
}
