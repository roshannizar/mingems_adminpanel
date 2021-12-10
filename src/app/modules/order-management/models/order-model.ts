import {OrderDescriptionModel} from './order-description-model';
import {OrderAddressModel} from './order-address-model';
import {CustomerModel} from './customer-model';

export class OrderModel {
    id: string;
    orderLines: Array<OrderDescriptionModel>;
    email: string;
    date: string;
    orderNotes: string;
    addressLines: OrderAddressModel;
    contactNumbers: Array<OrderAddressModel>;
    customers: CustomerModel;
    orderRef: string;
    orderTotal: number;
    paymentType: number;
    recordState: number;
    status: number;
}
