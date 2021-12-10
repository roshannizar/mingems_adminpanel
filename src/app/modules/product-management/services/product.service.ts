import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseService} from 'app/shared/services/base.service';
import {Observable} from 'rxjs';
import {CreateProductModel} from '../models/create-product-model';
import {ProductModel} from '../models/product-model';
import {UpdateProductModel} from '../models/update-product-model';
import {RecordStateEnum} from '../models/record-state-enum';

@Injectable({
    providedIn: 'root'
})
export class ProductService extends BaseService<ProductModel> {

    baseUrl: string;
    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/products';
    }

    getProducts(): Observable<Array<ProductModel>> {
        return this.get(`${this.baseUrl}`);
    }

    uploadImage(file: File): Observable<any> {
        return this.filePost(`v1/upload`, file);
    }

    createProduct(productModel: CreateProductModel): Observable<ProductModel> {
        return this.post(`${this.baseUrl}`, productModel);
    }

    deleteProduct(id: string) {
        return this.delete(`${this.baseUrl}?id=${id}`);
    }

    updateProduct(productModel: ProductModel): Observable<ProductModel> {
        return this.put(`${this.baseUrl}`, productModel);
    }
    /*updateProduct(productModel: UpdateProductModel): Observable<ProductModel> {
        productModel.recordState = RecordStateEnum.state2;
        return this.put(`${this.baseUrl}`, productModel);
    }*/
}
