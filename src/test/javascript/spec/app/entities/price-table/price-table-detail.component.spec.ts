/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EngenhosSkolEstacaoTestModule } from '../../../test.module';
import { PriceTableDetailComponent } from 'app/entities/price-table/price-table-detail.component';
import { PriceTable } from 'app/shared/model/price-table.model';

describe('Component Tests', () => {
    describe('PriceTable Management Detail Component', () => {
        let comp: PriceTableDetailComponent;
        let fixture: ComponentFixture<PriceTableDetailComponent>;
        const route = ({ data: of({ priceTable: new PriceTable(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EngenhosSkolEstacaoTestModule],
                declarations: [PriceTableDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PriceTableDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PriceTableDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.priceTable).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
