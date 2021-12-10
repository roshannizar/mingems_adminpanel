import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/shared/services/base.service';
import { Observable } from 'rxjs';
import { PromotionModel } from '../models/promotion-model';

@Injectable({
    providedIn: 'root'
})
export class PromotionService extends BaseService<PromotionModel> {

    baseUrl: string;
    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/promotions';
    }

    getPromotions(): Observable<Array<PromotionModel>> {
        return this.get(`${this.baseUrl}`);
    }

    uploadImage(file: File): Observable<any> {
        return this.filePost(`v1/upload`, file);
    }

    createPromotion(promotion: PromotionModel) {
        return this.post(`${this.baseUrl}`, promotion);
    }

    updatePromotion(promotion: PromotionModel): Observable<PromotionModel> {
        return this.put(`${this.baseUrl}`, promotion);
    }

    deletePromotion(id: string) {
        return this.delete(`${this.baseUrl}?id=${id}`);
    }
}
