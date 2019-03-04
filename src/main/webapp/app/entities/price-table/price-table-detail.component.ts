import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPriceTable } from 'app/shared/model/price-table.model';

@Component({
    selector: 'jhi-price-table-detail',
    templateUrl: './price-table-detail.component.html'
})
export class PriceTableDetailComponent implements OnInit {
    priceTable: IPriceTable;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ priceTable }) => {
            this.priceTable = priceTable;
        });
    }

    previousState() {
        window.history.back();
    }
}
