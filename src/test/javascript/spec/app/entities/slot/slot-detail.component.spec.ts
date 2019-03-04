/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EngenhosSkolEstacaoTestModule } from '../../../test.module';
import { SlotDetailComponent } from 'app/entities/slot/slot-detail.component';
import { Slot } from 'app/shared/model/slot.model';

describe('Component Tests', () => {
    describe('Slot Management Detail Component', () => {
        let comp: SlotDetailComponent;
        let fixture: ComponentFixture<SlotDetailComponent>;
        const route = ({ data: of({ slot: new Slot(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EngenhosSkolEstacaoTestModule],
                declarations: [SlotDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SlotDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SlotDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.slot).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
