import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPriceTable } from 'app/shared/model/price-table.model';
import { PriceTableService } from './price-table.service';

@Component({
    selector: 'jhi-price-table-delete-dialog',
    templateUrl: './price-table-delete-dialog.component.html'
})
export class PriceTableDeleteDialogComponent {
    priceTable: IPriceTable;

    constructor(
        protected priceTableService: PriceTableService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.priceTableService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'priceTableListModification',
                content: 'Deleted an priceTable'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-price-table-delete-popup',
    template: ''
})
export class PriceTableDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ priceTable }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PriceTableDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.priceTable = priceTable;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/price-table', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/price-table', { outlets: { popup: null } }]);
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
