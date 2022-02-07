import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "app/shared/services/base.service";
import { UserProfileModel } from "../models/user-profile-model";

@Injectable({
    providedIn: 'root'
})
export class ProfileService extends BaseService<UserProfileModel>{

    baseUrl: string;
    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'user';
    }

    getMetaData(){
        return this.getById(`${this.baseUrl}/metadata`);
    }

    updateMetaData(userProfileModel : UserProfileModel){
        return this.put(this.baseUrl, userProfileModel);
    }
}