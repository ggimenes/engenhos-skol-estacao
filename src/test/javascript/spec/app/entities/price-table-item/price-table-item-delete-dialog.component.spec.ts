/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EngenhosSkolEstacaoTestModule } from '../../../test.module';
import { PriceTableItemDeleteDialogComponent } from 'app/entities/price-table-item/price-table-item-delete-dialog.component';
import { PriceTableItemService } from 'app/entities/price-table-item/price-table-item.service';

describe('Component Tests', () => {
    describe('PriceTableItem Management Delete Component', () => {
        let comp: PriceTableItemDeleteDialogComponent;
        let fixture: ComponentFixture<PriceTableItemDeleteDialogComponent>;
        let service: PriceTableItemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EngenhosSkolEstacaoTestModule],
                declarations: [PriceTableItemDeleteDialogComponent]
            })
                .overrideTemplate(PriceTableItemDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PriceTableItemDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PriceTableItemService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
