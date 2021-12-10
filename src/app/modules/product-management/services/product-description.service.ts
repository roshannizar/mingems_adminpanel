import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { ProductDescriptionModel } from '../models/product-description-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDescriptionService extends BaseService<ProductDescriptionModel> {

  baseUrl: string;
  constructor(protected http: HttpClient) {
    super(http);
    this.baseUrl = 'v1/descriptions'
  }

  getOutOfStockProducts(): Observable<Array<ProductDescriptionModel>> {
    const appendUrl = 'outofstock';
    return this.get(`${this.baseUrl}/${appendUrl}`);
  }

  moveToOutOfStock(item: ProductDescriptionModel): Observable<ProductDescriptionModel> {
    return this.put(`${this.baseUrl}`, item);
  }

}
