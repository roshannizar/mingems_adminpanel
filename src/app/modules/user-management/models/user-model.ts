export class UserModel {
    firstName: string;
    lastName: string;
    verify: boolean;
    role: UserRoleEnums;
    email: string;
    lastLoggedDate: Date;
    ipAddress: string;
}

export class UserRoleEnums {
    SuperAdmin
    Admin
    User
    Customer
}
