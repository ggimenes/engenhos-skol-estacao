/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EngenhosSkolEstacaoTestModule } from '../../../test.module';
import { PriceIntervalDetailComponent } from 'app/entities/price-interval/price-interval-detail.component';
import { PriceInterval } from 'app/shared/model/price-interval.model';

describe('Component Tests', () => {
    describe('PriceInterval Management Detail Component', () => {
        let comp: PriceIntervalDetailComponent;
        let fixture: ComponentFixture<PriceIntervalDetailComponent>;
        const route = ({ data: of({ priceInterval: new PriceInterval(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EngenhosSkolEstacaoTestModule],
                declarations: [PriceIntervalDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PriceIntervalDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PriceIntervalDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.priceInterval).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
