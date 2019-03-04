/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EngenhosSkolEstacaoTestModule } from '../../../test.module';
import { PriceTableUpdateComponent } from 'app/entities/price-table/price-table-update.component';
import { PriceTableService } from 'app/entities/price-table/price-table.service';
import { PriceTable } from 'app/shared/model/price-table.model';

describe('Component Tests', () => {
    describe('PriceTable Management Update Component', () => {
        let comp: PriceTableUpdateComponent;
        let fixture: ComponentFixture<PriceTableUpdateComponent>;
        let service: PriceTableService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EngenhosSkolEstacaoTestModule],
                declarations: [PriceTableUpdateComponent]
            })
                .overrideTemplate(PriceTableUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PriceTableUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PriceTableService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new PriceTable(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.priceTable = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new PriceTable();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.priceTable = entity;
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
