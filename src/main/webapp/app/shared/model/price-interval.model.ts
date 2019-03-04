import { IPriceTableItem } from 'app/shared/model/price-table-item.model';

export interface IPriceInterval {
    id?: number;
    name?: string;
    initialMinutes?: number;
    finalMinutes?: number;
    priceTableItem?: IPriceTableItem;
}

export class PriceInterval implements IPriceInterval {
    constructor(
        public id?: number,
        public name?: string,
        public initialMinutes?: number,
        public finalMinutes?: number,
        public priceTableItem?: IPriceTableItem
    ) {}
}
