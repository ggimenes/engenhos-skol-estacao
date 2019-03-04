import { ISlot } from 'app/shared/model/slot.model';
import { IPriceTableItem } from 'app/shared/model/price-table-item.model';

export interface IProduct {
    id?: number;
    name?: string;
    description?: string;
    active?: boolean;
    slot?: ISlot;
    priceTableItem?: IPriceTableItem;
}

export class Product implements IProduct {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public active?: boolean,
        public slot?: ISlot,
        public priceTableItem?: IPriceTableItem
    ) {
        this.active = this.active || false;
    }
}
