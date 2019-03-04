import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPriceTable } from 'app/shared/model/price-table.model';

type EntityResponseType = HttpResponse<IPriceTable>;
type EntityArrayResponseType = HttpResponse<IPriceTable[]>;

@Injectable({ providedIn: 'root' })
export class PriceTableService {
    public resourceUrl = SERVER_API_URL + 'api/price-tables';

    constructor(protected http: HttpClient) {}

    create(priceTable: IPriceTable): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(priceTable);
        return this.http
            .post<IPriceTable>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(priceTable: IPriceTable): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(priceTable);
        return this.http
            .put<IPriceTable>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPriceTable>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPriceTable[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(priceTable: IPriceTable): IPriceTable {
        const copy: IPriceTable = Object.assign({}, priceTable, {
            initialDate:
                priceTable.initialDate != null && priceTable.initialDate.isValid() ? priceTable.initialDate.format(DATE_FORMAT) : null,
            endDate: priceTable.endDate != null && priceTable.endDate.isValid() ? priceTable.endDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.initialDate = res.body.initialDate != null ? moment(res.body.initialDate) : null;
            res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((priceTable: IPriceTable) => {
                priceTable.initialDate = priceTable.initialDate != null ? moment(priceTable.initialDate) : null;
                priceTable.endDate = priceTable.endDate != null ? moment(priceTable.endDate) : null;
            });
        }
        return res;
    }
}
