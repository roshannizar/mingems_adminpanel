import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/shared/services/base.service';
import { OrderModel } from '../models/order-model';

@Injectable({
    providedIn: 'root'
})
export class OrderService extends BaseService<OrderModel> {

    baseUrl: string;

    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/orders';
    }

    createOrder(order: OrderModel) {
        return this.post(this.baseUrl, order);
    }

    getOrders(index: number) {
        return this.get(`${this.baseUrl}?status=${index}`);
    }
}
