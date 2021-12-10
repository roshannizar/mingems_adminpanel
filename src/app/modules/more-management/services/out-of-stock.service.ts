
import { Injectable } from '@angular/core';
import { OutOfStockModel } from '../models/out-of-stock-model';
import { BaseService } from '../../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OutOfStockService extends BaseService<OutOfStockModel> {

    baseUrl: string;
    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/descriptions';
    }

    getOutOfStock() {
        return this.get(`${this.baseUrl}/outofstock`);
    }
}
