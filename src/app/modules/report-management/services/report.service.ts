import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/shared/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class ReportService extends BaseService<any> {

    fromDate: string;
    toDate: string;
    baseUrl: string;

    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = `v1/reports`;
    }

    getSalesReport() {
        return this.get(`${this.baseUrl}/sales/${this.fromDate}/${this.toDate}`);
    }

    getProductReport() {
        return this.get(`${this.baseUrl}/product`);
    }
}
