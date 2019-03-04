export interface IUserExtra {
    id?: number;
    firstName?: string;
    lastName?: string;
    cpf?: string;
    phone?: string;
}

export class UserExtra implements IUserExtra {
    constructor(public id?: number, public firstName?: string, public lastName?: string, public cpf?: string, public phone?: string) {}
}
