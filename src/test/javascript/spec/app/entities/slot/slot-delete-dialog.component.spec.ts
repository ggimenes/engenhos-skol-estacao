/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EngenhosSkolEstacaoTestModule } from '../../../test.module';
import { SlotDeleteDialogComponent } from 'app/entities/slot/slot-delete-dialog.component';
import { SlotService } from 'app/entities/slot/slot.service';

describe('Component Tests', () => {
    describe('Slot Management Delete Component', () => {
        let comp: SlotDeleteDialogComponent;
        let fixture: ComponentFixture<SlotDeleteDialogComponent>;
        let service: SlotService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EngenhosSkolEstacaoTestModule],
                declarations: [SlotDeleteDialogComponent]
            })
                .overrideTemplate(SlotDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SlotDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SlotService);
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
