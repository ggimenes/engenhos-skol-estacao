/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EngenhosSkolEstacaoTestModule } from '../../../test.module';
import { PriceIntervalUpdateComponent } from 'app/entities/price-interval/price-interval-update.component';
import { PriceIntervalService } from 'app/entities/price-interval/price-interval.service';
import { PriceInterval } from 'app/shared/model/price-interval.model';

describe('Component Tests', () => {
    describe('PriceInterval Management Update Component', () => {
        let comp: PriceIntervalUpdateComponent;
        let fixture: ComponentFixture<PriceIntervalUpdateComponent>;
        let service: PriceIntervalService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EngenhosSkolEstacaoTestModule],
                declarations: [PriceIntervalUpdateComponent]
            })
                .overrideTemplate(PriceIntervalUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PriceIntervalUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PriceIntervalService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new PriceInterval(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.priceInterval = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new PriceInterval();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.priceInterval = entity;
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
