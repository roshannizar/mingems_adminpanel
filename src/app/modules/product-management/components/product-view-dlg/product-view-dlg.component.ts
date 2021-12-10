import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ProductModel } from '../../models/product-model';
import {ProductDescriptionModel} from '../../models/product-description-model';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-product-view-dlg',
  templateUrl: './product-view-dlg.component.html',
  styleUrls: ['./product-view-dlg.component.css']
})
export class ProductViewDlgComponent implements OnInit {

  @Input() product: ProductModel;
  @Output() toggled = new EventEmitter<ProductDescriptionModel>();
  panelOpenState = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  toggleChange(item: ProductDescriptionModel, event: MatSlideToggleChange): void {
    // emit the ProductDescriptionModel object
    this.toggled.emit(item);
  }

}
