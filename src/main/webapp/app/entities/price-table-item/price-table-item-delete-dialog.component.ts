import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPriceTableItem } from 'app/shared/model/price-table-item.model';
import { PriceTableItemService } from './price-table-item.service';

@Component({
    selector: 'jhi-price-table-item-delete-dialog',
    templateUrl: './price-table-item-delete-dialog.component.html'
})
export class PriceTableItemDeleteDialogComponent {
    priceTableItem: IPriceTableItem;

    constructor(
        protected priceTableItemService: PriceTableItemService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.priceTableItemService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'priceTableItemListModification',
                content: 'Deleted an priceTableItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-price-table-item-delete-popup',
    template: ''
})
export class PriceTableItemDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ priceTableItem }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PriceTableItemDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.priceTableItem = priceTableItem;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/price-table-item', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/price-table-item', { outlets: { popup: null } }]);
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
