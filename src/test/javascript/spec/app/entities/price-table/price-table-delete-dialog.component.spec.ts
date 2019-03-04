/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EngenhosSkolEstacaoTestModule } from '../../../test.module';
import { PriceTableDeleteDialogComponent } from 'app/entities/price-table/price-table-delete-dialog.component';
import { PriceTableService } from 'app/entities/price-table/price-table.service';

describe('Component Tests', () => {
    describe('PriceTable Management Delete Component', () => {
        let comp: PriceTableDeleteDialogComponent;
        let fixture: ComponentFixture<PriceTableDeleteDialogComponent>;
        let service: PriceTableService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EngenhosSkolEstacaoTestModule],
                declarations: [PriceTableDeleteDialogComponent]
            })
                .overrideTemplate(PriceTableDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PriceTableDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PriceTableService);
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
