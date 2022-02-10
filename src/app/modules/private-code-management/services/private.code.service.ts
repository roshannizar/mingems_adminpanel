import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "app/shared/services/base.service";
import { PrivateCodeModel } from "../models/private-code-model";

@Injectable({
    providedIn: 'root'
})
export class PrivateCodeService extends BaseService<PrivateCodeModel>{

    baseUrl: string;
    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/privatecodes';
    }

    getPrivateCodes(){
        return this.get(this.baseUrl);
    }

    updatePrivateCode(privateCode: PrivateCodeModel) {
        return this.put(this.baseUrl, privateCode);
    }

    createPrivateCode(privateCode: PrivateCodeModel) {
        return this.post(this.baseUrl, privateCode);
    }

    deletePrivateCode(id: string) {
        return this.delete(`${this.baseUrl}?id=${id}`);
    }
}