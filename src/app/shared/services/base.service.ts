import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, throwError, timer } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export abstract class BaseService<T> {

    errorMessage: { status: any; message: string };
    protected baseApiEndPoint = environment.endpointUrl;
    imageBaseUrl = environment.cloudStorageUrl;

    constructor(protected http: HttpClient) { }

    public get(url: string): Observable<Array<T>> {
        return this.http.get<Array<T>>(`${this.baseApiEndPoint}/${url}`, this.getAuthHeader()).pipe(catchError(this.errorHandle));
    }

    public getById(url: string): Observable<T> {
        return this.http.get<T>(`${this.baseApiEndPoint}/${url}`, this.getAuthHeader()).pipe(catchError(this.errorHandle));
    }

    public post(url: string, body: Object): Observable<T> {
        return this.http.post<T>(`${this.baseApiEndPoint}/${url}`, body, this.getAuthHeader()).pipe(catchError(this.errorHandle));
    }

    public authPost(url: string, body: Object): Observable<T> {
        return this.http.post<T>(`${this.baseApiEndPoint}/${url}`, body).pipe(catchError(this.errorHandle));
    }

    public delete(url: string): Observable<void> {
        return this.http.delete<void>(`${this.baseApiEndPoint}/${url}`, this.getAuthHeader()).pipe(catchError(this.errorHandle));
    }

    public put(url: string, body: T): Observable<T> {
        return this.http.put<T>(`${this.baseApiEndPoint}/${url}`, body, this.getAuthHeader()).pipe(catchError(this.errorHandle));
    }

    public filePost(url: string, file: File) {
        const formData: FormData = new FormData();
        if (file != null && file !== undefined) {
            formData.append('file', file);
        }
        return this.http.post(`${this.imageBaseUrl}/${url}`, formData, this.getAuthHeader()).pipe(catchError(this.errorHandle));
    }

    observableTimer() {
        const source = timer(1000, 2000);
        const abc = source.subscribe(val => {
            console.log(val, '-');
        });
    }

    getToken() {
        return localStorage.length !== 0 ? localStorage.getItem('session') : 'undefined';
    }

    getAuthHeader() {
        const header = {
            headers: new HttpHeaders().set('Authorization', this.getToken())
        }
        return header;
    }

    errorHandle(error: Response | any) {
        if (error.status === 0) {
            this.errorMessage = {
                message: 'Please check your internet connection or token expired, Please try logging in',
                status: error.status
            };
        } else if (error.status === 401) {
            this.errorMessage = {
                message: error.error.Message,
                status: error.status
            };
        } else if (error.status === 401 || error.status === 408) {
            this.errorMessage = {
                message: 'Your login session has been expired, please login again',
                status: error.status
            };
        } else {
            this.errorMessage = {
                message: error.error.Message,
                status: error.status
            };
        }
        const errorMsg = Object.assign({}, this.errorMessage);
        return throwError(errorMsg);
    }
}
