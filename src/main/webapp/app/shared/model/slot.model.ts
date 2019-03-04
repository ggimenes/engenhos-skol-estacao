import { IStation } from 'app/shared/model/station.model';
import { IProduct } from 'app/shared/model/product.model';

export interface ISlot {
    id?: number;
    number?: string;
    positionX?: number;
    positionY?: number;
    stations?: IStation[];
    products?: IProduct[];
}

export class Slot implements ISlot {
    constructor(
        public id?: number,
        public number?: string,
        public positionX?: number,
        public positionY?: number,
        public stations?: IStation[],
        public products?: IProduct[]
    ) {}
}
