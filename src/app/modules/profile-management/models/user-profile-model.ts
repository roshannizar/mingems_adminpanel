export class UserProfileModel {
    id: string;
    firstName: string;
    lastName: string;
    ipAddress: string;
    lastLoggedDate: Date;
    role: RoleEnum;
    verify: boolean
}

export enum RoleEnum {
    Admin,
    Customer
}
