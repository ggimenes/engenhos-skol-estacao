/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EngenhosSkolEstacaoTestModule } from '../../../test.module';
import { PriceTableItemUpdateComponent } from 'app/entities/price-table-item/price-table-item-update.component';
import { PriceTableItemService } from 'app/entities/price-table-item/price-table-item.service';
import { PriceTableItem } from 'app/shared/model/price-table-item.model';

describe('Component Tests', () => {
    describe('PriceTableItem Management Update Component', () => {
        let comp: PriceTableItemUpdateComponent;
        let fixture: ComponentFixture<PriceTableItemUpdateComponent>;
        let service: PriceTableItemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EngenhosSkolEstacaoTestModule],
                declarations: [PriceTableItemUpdateComponent]
            })
                .overrideTemplate(PriceTableItemUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PriceTableItemUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PriceTableItemService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new PriceTableItem(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.priceTableItem = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new PriceTableItem();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.priceTableItem = entity;
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
