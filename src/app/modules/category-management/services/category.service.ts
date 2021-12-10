import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/shared/services/base.service';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/category-model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService extends BaseService<CategoryModel> {

    baseUrl: string;
    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/category';
    }

    getCategories(): Observable<Array<CategoryModel>> {
        return this.get(`${this.baseUrl}`);
    }

    getCategory(id: string) {
        return this.getById(`${this.baseUrl}/${id}`);
    }

    createCategory(categoryModel: CategoryModel) {
        return this.post(`${this.baseUrl}`, categoryModel);
    }

    putCategory(categoryModel: CategoryModel) {
        return this.put(`${this.baseUrl}`, categoryModel);
    }

    deleteCategory(id: string) {
        return this.delete(`${this.baseUrl}?id=${id}`);
    }
}
