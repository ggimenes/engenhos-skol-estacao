/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EngenhosSkolEstacaoTestModule } from '../../../test.module';
import { PriceIntervalDeleteDialogComponent } from 'app/entities/price-interval/price-interval-delete-dialog.component';
import { PriceIntervalService } from 'app/entities/price-interval/price-interval.service';

describe('Component Tests', () => {
    describe('PriceInterval Management Delete Component', () => {
        let comp: PriceIntervalDeleteDialogComponent;
        let fixture: ComponentFixture<PriceIntervalDeleteDialogComponent>;
        let service: PriceIntervalService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EngenhosSkolEstacaoTestModule],
                declarations: [PriceIntervalDeleteDialogComponent]
            })
                .overrideTemplate(PriceIntervalDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PriceIntervalDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PriceIntervalService);
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
