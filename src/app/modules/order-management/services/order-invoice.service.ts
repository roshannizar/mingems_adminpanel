import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderTentativeModel } from '../models/order-tentative-model';

@Injectable({
    providedIn: 'root'
})
export class OrderInvoiceService extends BaseService<OrderTentativeModel> {

    baseUrl: string;
    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/orders';
    }

    updateOrderTotal(body: OrderTentativeModel): Observable<void | any> {
        return this.put(`${this.baseUrl}/tentative`, body);
    }
}
