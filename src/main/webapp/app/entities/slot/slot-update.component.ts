import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ISlot } from 'app/shared/model/slot.model';
import { SlotService } from './slot.service';

@Component({
    selector: 'jhi-slot-update',
    templateUrl: './slot-update.component.html'
})
export class SlotUpdateComponent implements OnInit {
    slot: ISlot;
    isSaving: boolean;

    constructor(protected slotService: SlotService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ slot }) => {
            this.slot = slot;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.slot.id !== undefined) {
            this.subscribeToSaveResponse(this.slotService.update(this.slot));
        } else {
            this.subscribeToSaveResponse(this.slotService.create(this.slot));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISlot>>) {
        result.subscribe((res: HttpResponse<ISlot>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
