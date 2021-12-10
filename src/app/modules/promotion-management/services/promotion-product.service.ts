import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/shared/services/base.service';
import { PromotionProductModel } from '../models/promotion-product-model';

@Injectable({
    providedIn: 'root'
})
export class PromotionProductService extends BaseService<PromotionProductModel> {

    baseUrl: string;

    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/products';
    }

    getProducts() {
        return this.get(`${this.baseUrl}`);
    }
}
