/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EngenhosSkolEstacaoTestModule } from '../../../test.module';
import { SlotUpdateComponent } from 'app/entities/slot/slot-update.component';
import { SlotService } from 'app/entities/slot/slot.service';
import { Slot } from 'app/shared/model/slot.model';

describe('Component Tests', () => {
    describe('Slot Management Update Component', () => {
        let comp: SlotUpdateComponent;
        let fixture: ComponentFixture<SlotUpdateComponent>;
        let service: SlotService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EngenhosSkolEstacaoTestModule],
                declarations: [SlotUpdateComponent]
            })
                .overrideTemplate(SlotUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SlotUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SlotService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Slot(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.slot = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Slot();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.slot = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
