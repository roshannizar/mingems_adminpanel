import {OrderAddressModel} from './order-address-model';
import {OrderContactModel} from './order-contact-model';

export class CustomerModel {
    addressLines: OrderAddressModel;
    contactNumbers: OrderContactModel;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    recordState: number;
    role: number;
    token: string;
    verify: boolean
}
