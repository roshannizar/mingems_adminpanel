import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/shared/services/base.service';
import { LinkModel } from '../models/auth-model';

@Injectable({
    providedIn: 'root'
})

export class AuthResetService extends BaseService<LinkModel> {
    baseUrl: string;

    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'user';
    }

    resetPasswordLink(linkModel: LinkModel) {
        return this.authPost(`${this.baseUrl}/forgotpassword`, linkModel);
    }
}
