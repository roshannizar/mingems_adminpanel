import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchaseModel } from 'app/modules/purchase-management/model/purchase-model';
import { BaseService } from 'app/shared/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InventoryService extends BaseService<PurchaseModel> {

    baseUrl: string;

    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/inventories';
    }

    getInventories() {
        return this.get(this.baseUrl);
    }

    getInventory(id: string) {
        return this.getById(`${this.baseUrl}/${id}`);
    }

    updateInventory(purchaseModel: PurchaseModel) {
        return this.put(this.baseUrl, purchaseModel);
    }

    deleteInventory(id: string) {
        return this.delete(`${this.baseUrl}?id=${id}`);
    }

    uploadImage(file: File): Observable<any> {
        return this.filePost(`v1/upload`, file);
    }
}
