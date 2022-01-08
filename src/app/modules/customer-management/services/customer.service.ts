import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/shared/services/base.service';
import { CustomerModel } from '../models/customer-model';

@Injectable({
    providedIn: 'root'
})
export class CustomerService extends BaseService<CustomerModel> {
    baseUrl: string;
    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/customers';
    }

    getCustomers() {
        return this.get(this.baseUrl);
    }

    getCustomer(id: string) {
        return this.getById(`${this.baseUrl}/${id}`);
    }

    createCustomer(customerModel: CustomerModel) {
        return this.post(this.baseUrl, customerModel);
    }

    updateCustomer(customerModel: CustomerModel) {
        return this.put(this.baseUrl, customerModel);
    }

    deleteCustomer(id: string) {
        return this.delete(`${this.baseUrl}?id=${id}`);
    }
}
