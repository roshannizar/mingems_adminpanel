import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CategoryModel } from 'app/modules/product-management/models/category-model';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {

  message: string;
  name: string;
  block = false;
  @Input() category: CategoryModel;
  @Output() deleted = new EventEmitter();

  constructor(private toastr: ToastrService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.message = `Are you sure that you want to remove ${this.category.name}`;
    this.name = this.category.name;
  }

  confirmDelete(id: string) {
    this.block = false;
    this.categoryService.deleteCategory(id).subscribe(
      (result) => {
        this.block = false;
        this.deleted.emit();
        this.toastr.success('Delete successfully!');
      },
      (error) => {
        this.block = false;
        this.toastr.error(error.message, `Failed to delete ${id}`);
      }
    );
  }

}
