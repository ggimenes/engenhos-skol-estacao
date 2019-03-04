/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PriceTableService } from 'app/entities/price-table/price-table.service';
import { IPriceTable, PriceTable } from 'app/shared/model/price-table.model';

describe('Service Tests', () => {
    describe('PriceTable Service', () => {
        let injector: TestBed;
        let service: PriceTableService;
        let httpMock: HttpTestingController;
        let elemDefault: IPriceTable;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PriceTableService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new PriceTable(0, 'AAAAAAA', currentDate, currentDate, false);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        initialDate: currentDate.format(DATE_FORMAT),
                        endDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a PriceTable', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        initialDate: currentDate.format(DATE_FORMAT),
                        endDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        initialDate: currentDate,
                        endDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new PriceTable(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a PriceTable', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        initialDate: currentDate.format(DATE_FORMAT),
                        endDate: currentDate.format(DATE_FORMAT),
                        active: true
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        initialDate: currentDate,
                        endDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of PriceTable', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        initialDate: currentDate.format(DATE_FORMAT),
                        endDate: currentDate.format(DATE_FORMAT),
                        active: true
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        initialDate: currentDate,
                        endDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a PriceTable', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
