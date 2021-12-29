import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/shared/services/base.service';
import { PurchaseModel } from '../model/purchase-model';

@Injectable({
    providedIn: 'root'
})
export class PurchaseService extends BaseService<PurchaseModel> {
    baseUrl: string;

    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/purchases';
    }

    getPurchases() {
        return this.get(this.baseUrl);
    }

    getPurchase(id: string) {
        return this.getById(`${this.baseUrl}/${id}`);
    }

    createPurchase(purchase: PurchaseModel) {
        return this.post(this.baseUrl, purchase);
    }

    updatePurchase(purchase: PurchaseModel) {
        return this.put(this.baseUrl, purchase);
    }

    deletePurchase(id: string) {
        return this.delete(`${this.baseUrl}?id=${id}`);
    }
}
