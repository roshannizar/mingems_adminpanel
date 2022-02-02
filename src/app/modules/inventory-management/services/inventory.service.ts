import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/shared/services/base.service';
import { Observable } from 'rxjs';
import { InventoryModel } from '../models/inventory-model';

@Injectable({
    providedIn: 'root'
})
export class InventoryService extends BaseService<InventoryModel> {

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

    createInventory(inventoryModel: InventoryModel) {
        return this.post(this.baseUrl, inventoryModel);
    }

    updateInventory(inventoryModel: InventoryModel) {
        return this.put(this.baseUrl, inventoryModel);
    }

    deleteInventory(id: string) {
        return this.delete(`${this.baseUrl}?id=${id}`);
    }

    uploadImage(file: File): Observable<any> {
        return this.filePost(`v1/upload`, file);
    }
}
