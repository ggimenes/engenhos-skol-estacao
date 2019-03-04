import { Moment } from 'moment';
import { IPriceTableItem } from 'app/shared/model/price-table-item.model';

export interface IPriceTable {
    id?: number;
    name?: string;
    initialDate?: Moment;
    endDate?: Moment;
    active?: boolean;
    items?: IPriceTableItem[];
}

export class PriceTable implements IPriceTable {
    constructor(
        public id?: number,
        public name?: string,
        public initialDate?: Moment,
        public endDate?: Moment,
        public active?: boolean,
        public items?: IPriceTableItem[]
    ) {
        this.active = this.active || false;
    }
}
