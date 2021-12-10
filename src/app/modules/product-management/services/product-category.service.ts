import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/shared/services/base.service';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/category-model';

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryService extends BaseService<CategoryModel> {

    baseUrl: string;
    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/category';
    }

    getCategory(): Observable<Array<CategoryModel>> {
        return this.get(`${this.baseUrl}`);
    }
}
