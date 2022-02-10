import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PurchaseModel } from "app/modules/purchase-management/model/purchase-model";
import { BaseService } from "app/shared/services/base.service";
import { SearchModel } from "../models/search-model";

@Injectable({
    providedIn: 'root'
})
export class SearchService extends BaseService<PurchaseModel> {
    baseUrl: string;

    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/inventories';
    }

    getSearchInventories(search: SearchModel): any {
        return this.post(`${this.baseUrl}/search`, search);
    }
}