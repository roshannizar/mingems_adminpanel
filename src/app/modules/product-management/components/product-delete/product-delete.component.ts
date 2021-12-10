import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {CategoryService} from '../../../category-management/services/category.service';
import {ProductModel} from '../../models/product-model';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  message: string;
  name: string;
  block = false;
  @Input() product: ProductModel;
  @Output() deleted = new EventEmitter();

  constructor(private toastr: ToastrService, private productService: ProductService) { }

  ngOnInit(): void {
    this.message = `Are you sure that you want to remove ${this.product.name}`;
    this.name = this.product.name;
  }

  confirmDelete(id: string) {
    this.block = false;
    this.productService.deleteProduct(id).subscribe(
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
