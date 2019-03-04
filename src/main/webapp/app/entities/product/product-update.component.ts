import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { ISlot } from 'app/shared/model/slot.model';
import { SlotService } from 'app/entities/slot';
import { IPriceTableItem } from 'app/shared/model/price-table-item.model';
import { PriceTableItemService } from 'app/entities/price-table-item';

@Component({
    selector: 'jhi-product-update',
    templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
    product: IProduct;
    isSaving: boolean;

    slots: ISlot[];

    pricetableitems: IPriceTableItem[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected productService: ProductService,
        protected slotService: SlotService,
        protected priceTableItemService: PriceTableItemService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ product }) => {
            this.product = product;
        });
        this.slotService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISlot[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISlot[]>) => response.body)
            )
            .subscribe((res: ISlot[]) => (this.slots = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.product.id !== undefined) {
            this.subscribeToSaveResponse(this.productService.update(this.product));
        } else {
            this.subscribeToSaveResponse(this.productService.create(this.product));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>) {
        result.subscribe((res: HttpResponse<IProduct>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSlotById(index: number, item: ISlot) {
        return item.id;
    }

    trackPriceTableItemById(index: number, item: IPriceTableItem) {
        return item.id;
    }
}
