import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/shared/services/base.service';
import { PurchaseSupplierModel } from '../model/purchase-model';

@Injectable({
    providedIn: 'root'
})
export class PurchaseSupplierService extends BaseService<PurchaseSupplierModel> {
    baseUrl: string;

    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/suppliers';
    }

    getSuppliers() {
        return this.get(this.baseUrl);
    }
}
