import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPriceTableItem } from 'app/shared/model/price-table-item.model';

@Component({
    selector: 'jhi-price-table-item-detail',
    templateUrl: './price-table-item-detail.component.html'
})
export class PriceTableItemDetailComponent implements OnInit {
    priceTableItem: IPriceTableItem;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ priceTableItem }) => {
            this.priceTableItem = priceTableItem;
        });
    }

    previousState() {
        window.history.back();
    }
}
