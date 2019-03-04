import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPriceInterval } from 'app/shared/model/price-interval.model';
import { PriceIntervalService } from './price-interval.service';

@Component({
    selector: 'jhi-price-interval-delete-dialog',
    templateUrl: './price-interval-delete-dialog.component.html'
})
export class PriceIntervalDeleteDialogComponent {
    priceInterval: IPriceInterval;

    constructor(
        protected priceIntervalService: PriceIntervalService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.priceIntervalService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'priceIntervalListModification',
                content: 'Deleted an priceInterval'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-price-interval-delete-popup',
    template: ''
})
export class PriceIntervalDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ priceInterval }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PriceIntervalDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.priceInterval = priceInterval;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/price-interval', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/price-interval', { outlets: { popup: null } }]);
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
