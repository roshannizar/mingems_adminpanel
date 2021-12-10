import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/shared/services/base.service';
import { UserModel } from '../models/user-model';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService<UserModel> {

    baseUrl: string;

    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'user';
    }

    getUsers() {
        return this.get(`${this.baseUrl}`);
    }

    getLastLogged() {
        return this.get(`${this.baseUrl}/lastlogged`);
    }
}
