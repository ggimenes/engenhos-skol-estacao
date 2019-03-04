import { ISlot } from 'app/shared/model/slot.model';

export interface IStation {
    id?: number;
    name?: string;
    code?: string;
    streetAddress?: string;
    streetNumber?: string;
    district?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    slot?: ISlot;
}

export class Station implements IStation {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public streetAddress?: string,
        public streetNumber?: string,
        public district?: string,
        public city?: string,
        public state?: string,
        public zipCode?: string,
        public country?: string,
        public slot?: ISlot
    ) {}
}
