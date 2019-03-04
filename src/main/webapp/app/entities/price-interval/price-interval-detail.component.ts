import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPriceInterval } from 'app/shared/model/price-interval.model';

@Component({
    selector: 'jhi-price-interval-detail',
    templateUrl: './price-interval-detail.component.html'
})
export class PriceIntervalDetailComponent implements OnInit {
    priceInterval: IPriceInterval;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ priceInterval }) => {
            this.priceInterval = priceInterval;
        });
    }

    previousState() {
        window.history.back();
    }
}
