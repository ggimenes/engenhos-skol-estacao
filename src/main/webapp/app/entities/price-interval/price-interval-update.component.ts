import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPriceInterval } from 'app/shared/model/price-interval.model';
import { PriceIntervalService } from './price-interval.service';
import { IPriceTableItem } from 'app/shared/model/price-table-item.model';
import { PriceTableItemService } from 'app/entities/price-table-item';

@Component({
    selector: 'jhi-price-interval-update',
    templateUrl: './price-interval-update.component.html'
})
export class PriceIntervalUpdateComponent implements OnInit {
    priceInterval: IPriceInterval;
    isSaving: boolean;

    pricetableitems: IPriceTableItem[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected priceIntervalService: PriceIntervalService,
        protected priceTableItemService: PriceTableItemService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ priceInterval }) => {
            this.priceInterval = priceInterval;
        });
        this.priceTableItemService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPriceTableItem[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPriceTableItem[]>) => response.body)
            )
            .subscribe((res: IPriceTableItem[]) => (this.pricetableitems = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.priceInterval.id !== undefined) {
            this.subscribeToSaveResponse(this.priceIntervalService.update(this.priceInterval));
        } else {
            this.subscribeToSaveResponse(this.priceIntervalService.create(this.priceInterval));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPriceInterval>>) {
        result.subscribe((res: HttpResponse<IPriceInterval>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPriceTableItemById(index: number, item: IPriceTableItem) {
        return item.id;
    }
}
