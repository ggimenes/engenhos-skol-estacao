import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISlot } from 'app/shared/model/slot.model';
import { SlotService } from './slot.service';

@Component({
    selector: 'jhi-slot-delete-dialog',
    templateUrl: './slot-delete-dialog.component.html'
})
export class SlotDeleteDialogComponent {
    slot: ISlot;

    constructor(protected slotService: SlotService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.slotService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'slotListModification',
                content: 'Deleted an slot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-slot-delete-popup',
    template: ''
})
export class SlotDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ slot }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SlotDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.slot = slot;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/slot', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/slot', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
