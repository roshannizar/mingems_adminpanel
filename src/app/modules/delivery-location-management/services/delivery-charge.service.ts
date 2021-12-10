import { Injectable } from '@angular/core';
import {BaseService} from '../../../shared/services/base.service';
import {DeliveryChargeModel} from '../models/delivery-charge-model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryChargeService extends BaseService<DeliveryChargeModel> {

  baseUrl: string

  constructor(protected http: HttpClient) {
    super(http);
    this.baseUrl = 'v1/deliveryCharges'
  }

  getDeliveryCharges(): Observable<Array<DeliveryChargeModel>> {
    return this.get(`${this.baseUrl}`);
  }

  createDeliveryCharge(deliveryCharge: DeliveryChargeModel): Observable<DeliveryChargeModel> {
    return this.post(`${this.baseUrl}`, deliveryCharge);
  }

  updateDeliveryCharge(deliveryCharge: DeliveryChargeModel): Observable<DeliveryChargeModel> {
    return this.put(`${this.baseUrl}`, deliveryCharge);
  }

  deleteDeliveryCharge(id: string): Observable<void> {
    return this.delete(`${this.baseUrl}?id=${id}`);
  }
}
