import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/shared/services/base.service';
import { SubscriptionModel } from '../models/subscription-model';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService extends BaseService<SubscriptionModel> {

    baseUrl: string;
    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/utility'
    }

    getSubscriptions() {
        return this.get(this.baseUrl);
    }
}
