import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { SupplierModel } from '../models/supplier-model';

@Injectable({
    providedIn: 'root'
})
export class SupplierService extends BaseService<SupplierModel> {

    baseUrl: string;
    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/suppliers';
    }

    getSuppliers() {
        return this.get(this.baseUrl);
    }

    getSupplier(id: string) {
        return this.getById(`${this.baseUrl}/${id}`);
    }

    createSupplier(supplierModel: SupplierModel) {
        return this.post(this.baseUrl, supplierModel);
    }

    updateSupplier(supplierModel: SupplierModel) {
        return this.put(this.baseUrl, supplierModel);
    }

    deleteSupplier(id: string) {
        return this.delete(`${this.baseUrl}?id=${id}`);
    }
}
