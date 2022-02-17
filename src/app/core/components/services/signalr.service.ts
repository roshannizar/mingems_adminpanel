import { EventEmitter, Injectable } from '@angular/core';
import * as signalr from '@aspnet/signalr';
import { environment } from 'environments/environment';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { OrderHubModel } from '../models/order-hub-model';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    private hubConnection: signalr.HubConnection;
    signalReceived = new EventEmitter<OrderHubModel>();
    signalSent = new EventEmitter<boolean>();

    constructor(private toastr: ToastrService) {
        this.buildConnection();
        this.startConnection();
    }

    private buildConnection = () => {
        this.hubConnection = new signalr.HubConnectionBuilder().withUrl(environment.signalrRUrl).build();
    }

    private startConnection = () => {
        this.hubConnection.start().then(() => {
            this.registerSignalEvents();
        }).catch(err => {
            // this.toastr.warning('Failed to connect Real Time, Contact the vendor', 'Error');
        })
    }

    private registerSignalEvents() {
        this.hubConnection.on('notification', (data: OrderHubModel) => {
            this.signalReceived.emit(data);
        })
    }
}
