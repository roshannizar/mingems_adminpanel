import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "../../../shared/services/base.service";
import { Observable } from "rxjs";
import { InvestmentModel } from "../models/investment-model";

@Injectable({
    providedIn: 'root'
})
export class InvestmentService extends BaseService<InvestmentModel> {

    baseUrl: string;
    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/investments';
    }

    getInvestments(): Observable<Array<InvestmentModel>> {
        return this.get(this.baseUrl);
    }

    getOriginInvestments(): Observable<Array<InvestmentModel>> {
        return this.get(`${this.baseUrl}/origin`);
    }

    getInvestment(id: string) {
        return this.getById(`${this.baseUrl}/${id}`);
    }

    createInvestment(model: InvestmentModel) {
        return this.post(this.baseUrl, model);
    }

    updateInvestment(model: InvestmentModel) {
        return this.put(this.baseUrl, model);
    }

    deleteInvestment(id: string) {
        return this.delete(`${this.baseUrl}?id=${id}`);
    }
}