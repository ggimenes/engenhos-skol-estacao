import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISlot } from 'app/shared/model/slot.model';

@Component({
    selector: 'jhi-slot-detail',
    templateUrl: './slot-detail.component.html'
})
export class SlotDetailComponent implements OnInit {
    slot: ISlot;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ slot }) => {
            this.slot = slot;
        });
    }

    previousState() {
        window.history.back();
    }
}
