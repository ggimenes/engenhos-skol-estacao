import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IPriceTable } from 'app/shared/model/price-table.model';
import { PriceTableService } from './price-table.service';
import { IPriceTableItem } from 'app/shared/model/price-table-item.model';
import { PriceTableItemService } from 'app/entities/price-table-item';

@Component({
    selector: 'jhi-price-table-update',
    templateUrl: './price-table-update.component.html'
})
export class PriceTableUpdateComponent implements OnInit {
    priceTable: IPriceTable;
    isSaving: boolean;

    pricetableitems: IPriceTableItem[];
    initialDateDp: any;
    endDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected priceTableService: PriceTableService,
        protected priceTableItemService: PriceTableItemService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ priceTable }) => {
            this.priceTable = priceTable;
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
        if (this.priceTable.id !== undefined) {
            this.subscribeToSaveResponse(this.priceTableService.update(this.priceTable));
        } else {
            this.subscribeToSaveResponse(this.priceTableService.create(this.priceTable));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPriceTable>>) {
        result.subscribe((res: HttpResponse<IPriceTable>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
