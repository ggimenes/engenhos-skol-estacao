import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPriceTableItem } from 'app/shared/model/price-table-item.model';
import { PriceTableItemService } from './price-table-item.service';
import { IPriceTable } from 'app/shared/model/price-table.model';
import { PriceTableService } from 'app/entities/price-table';

@Component({
    selector: 'jhi-price-table-item-update',
    templateUrl: './price-table-item-update.component.html'
})
export class PriceTableItemUpdateComponent implements OnInit {
    priceTableItem: IPriceTableItem;
    isSaving: boolean;

    pricetables: IPriceTable[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected priceTableItemService: PriceTableItemService,
        protected priceTableService: PriceTableService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ priceTableItem }) => {
            this.priceTableItem = priceTableItem;
        });
        this.priceTableService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPriceTable[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPriceTable[]>) => response.body)
            )
            .subscribe((res: IPriceTable[]) => (this.pricetables = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.priceTableItem.id !== undefined) {
            this.subscribeToSaveResponse(this.priceTableItemService.update(this.priceTableItem));
        } else {
            this.subscribeToSaveResponse(this.priceTableItemService.create(this.priceTableItem));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPriceTableItem>>) {
        result.subscribe((res: HttpResponse<IPriceTableItem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPriceTableById(index: number, item: IPriceTable) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
