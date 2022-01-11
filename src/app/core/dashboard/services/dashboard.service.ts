import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/shared/services/base.service';
import { DashboardModel } from '../models/dashboard-model';

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends BaseService<DashboardModel> {

    baseUrl: string;

    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/reports/meta'
    }

    getDashboard() {
        return this.getById(`${this.baseUrl}`);
    }
}
