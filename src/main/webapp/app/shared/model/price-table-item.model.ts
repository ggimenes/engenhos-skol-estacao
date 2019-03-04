import { IProduct } from 'app/shared/model/product.model';
import { IPriceInterval } from 'app/shared/model/price-interval.model';
import { IPriceTable } from 'app/shared/model/price-table.model';

export interface IPriceTableItem {
    id?: number;
    price?: number;
    products?: IProduct[];
    priceIntervals?: IPriceInterval[];
    priceTables?: IPriceTable[];
}

export class PriceTableItem implements IPriceTableItem {
    constructor(
        public id?: number,
        public price?: number,
        public products?: IProduct[],
        public priceIntervals?: IPriceInterval[],
        public priceTables?: IPriceTable[]
    ) {}
}
