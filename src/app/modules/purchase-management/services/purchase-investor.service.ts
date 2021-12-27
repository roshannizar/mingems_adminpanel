import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/shared/services/base.service';
import { PurchaseInvestorModel } from '../model/purchase-model';

@Injectable({
    providedIn: 'root'
})
export class PurchaseInvestorService extends BaseService<PurchaseInvestorModel> {
    baseUrl: string;

    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/investments';
    }

    getInvestors() {
        return this.get(this.baseUrl);
    }
}
