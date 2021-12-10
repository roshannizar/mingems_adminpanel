import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/shared/services/base.service';
import { Observable } from 'rxjs';
import { SliderModel } from '../models/slider-model';

@Injectable({
    providedIn: 'root'
})
export class SliderService extends BaseService<SliderModel> {

    baseUrl: string;

    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'v1/sliders';
    }

    getSliders(): Observable<Array<SliderModel>> {
        return this.get(`${this.baseUrl}`);
    }

    createSlider(sliderModel: SliderModel) {
        return this.post(`${this.baseUrl}`, sliderModel);
    }

    updateSlider(sliderModel: SliderModel) {
        return this.put(`${this.baseUrl}`, sliderModel);
    }

    deleteSlider(id: string) {
        return this.delete(`${this.baseUrl}?id=${id}`);
    }

    uploadImage(file: File): Observable<any> {
        return this.filePost(`v1/upload`, file);
    }
}
