import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderModel } from '../models/order-model';
import { OrderTotalUpdate } from '../models/order-total-update';
import { BaseService } from 'app/shared/services/base.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<OrderModel> {

  baseUrl: string;
  updateUrl: string;
  updateTotalUrl: string;
  constructor(protected http: HttpClient) {
    super(http);
    this.baseUrl = 'v1/orders';
    this.updateUrl = 'updateStatus';
  }

  getOrders(status: number, pageNo: number): Observable<any> {
    return this.http.get(`${this.baseApiEndPoint}/${this.baseUrl}?status=${status}&pageNo=${pageNo}`,
    this.getAuthHeader()).pipe(catchError(this.errorHandle));
  }

  updateOrderStatus(id: string): Observable<void | any> {
    const urlWithParams = this.updateUrl + '?id=' + id;
    const orderModel = new OrderModel();
    return this.put(`${this.baseUrl}/${urlWithParams}`, orderModel);
  }
}
