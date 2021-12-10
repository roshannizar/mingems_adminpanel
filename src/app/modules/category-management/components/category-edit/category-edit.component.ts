import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel } from '../../models/category-model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  categoryBlock = false;
  categoryForm: FormGroup;
  @Input()category: CategoryModel;
  @Output()updated = new EventEmitter();

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createCategoryForm();
    this.patchCategory(this.category);
  }

  createCategoryForm() {
    this.categoryForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      isTentative: [false]
    });
  }

  patchCategory(categoryModel: CategoryModel) {
    this.categoryForm.patchValue({
      id: categoryModel.id,
      name: categoryModel.name,
      isTentative: categoryModel.isTentative
    });
  }

  updateCategory() {
    this.categoryBlock = true;
    this.category = Object.assign({}, this.category, this.categoryForm.value);
    this.categoryService.putCategory(this.category).subscribe(
      (result) => {
        this.categoryBlock = false;
        this.updated.emit();
        this.toastr.success('Category details updated successfully');
      },
      (error) => {
        this.categoryBlock = false;
        this.toastr.error(error.message, 'Failed to update category details');
      }
    );
  }
}
