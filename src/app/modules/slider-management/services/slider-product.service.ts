import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/shared/services/base.service';
import { Observable } from 'rxjs';
import { SliderProductModel } from '../models/slider-model';

@Injectable({
    providedIn: 'root'
})
export class SliderProductService extends BaseService<SliderProductModel> {

    baseUrl: string;
    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/products';
    }

    getSliderProducts(): Observable<Array<SliderProductModel>> {
        return this.get(`${this.baseUrl}`);
    }
}
