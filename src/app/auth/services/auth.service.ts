import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BaseService } from 'app/shared/services/base.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthModel } from '../models/auth-model';
import { AuthResponseModel } from '../models/auth-model';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService<AuthResponseModel> {

    baseUrl: string;
    constructor(protected http: HttpClient, public jwtHelper: JwtHelperService, private toaster: ToastrService) {
        super(http);
        this.baseUrl = 'user'
    }

    authentication(authModel: AuthModel): Observable<AuthResponseModel> {
        return this.authPost(`${this.baseUrl}/authenticate`, authModel);
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('session');
        try {
            const payload = this.jwtHelper.decodeToken(token);
            if (payload?.role === 'SuperAdmin' || payload?.role === 'Admin') {
                return true;
            } else {
                this.toaster.warning('Access Denied for this credentials!');
                return false;
            }
        } catch (e) {
            this.toaster.error(token);
        }
    }
}
