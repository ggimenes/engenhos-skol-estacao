/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EngenhosSkolEstacaoTestModule } from '../../../test.module';
import { PriceTableItemDetailComponent } from 'app/entities/price-table-item/price-table-item-detail.component';
import { PriceTableItem } from 'app/shared/model/price-table-item.model';

describe('Component Tests', () => {
    describe('PriceTableItem Management Detail Component', () => {
        let comp: PriceTableItemDetailComponent;
        let fixture: ComponentFixture<PriceTableItemDetailComponent>;
        const route = ({ data: of({ priceTableItem: new PriceTableItem(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EngenhosSkolEstacaoTestModule],
                declarations: [PriceTableItemDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PriceTableItemDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PriceTableItemDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.priceTableItem).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
