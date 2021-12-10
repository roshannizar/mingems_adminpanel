import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ProductModel } from '../../models/product-model';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {ProductDescriptionModel} from '../../models/product-description-model';
import {ProductService} from '../../services/product.service';
import {ProductDescriptionService} from '../../services/product-description.service';

@Component({
  selector: 'app-product-description-view-dlg',
  templateUrl: './product-description-view-dlg.component.html',
  styleUrls: ['./product-description-view-dlg.component.css']
})
export class ProductDescriptionViewDlgComponent implements OnInit {

  @Input() product: ProductModel;
  @Output() toggled = new EventEmitter<ProductDescriptionModel>();
  descriptions = Array<ProductDescriptionModel>();
  panelOpenState = false;
  constructor(
      private productService: ProductService,
      private productDescService: ProductDescriptionService
  ) { }

  ngOnInit(): void {
    this.getOutOfStockProducts();
  }

  // moving to out-of-stock section
  toggleChange(item: ProductDescriptionModel, event: MatSlideToggleChange): void {
    const id = item.id;
    const elem = document.getElementById(id);

    // emit the ProductDescriptionModel object
    this.toggled.emit(item);

    // setTimeout(() => {
    //   elem.setAttribute('hidden', 'true');
    //   this.toggled.emit(item);
    // }, 3000);
  }
  // end of moving to out-of-stock section

  getOutOfStockProducts(): void {
    this.productDescService.getOutOfStockProducts().subscribe((descriptions) => {
      this.descriptions = descriptions;
    });
  }
}
