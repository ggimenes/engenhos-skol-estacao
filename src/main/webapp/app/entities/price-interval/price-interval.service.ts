import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPriceInterval } from 'app/shared/model/price-interval.model';

type EntityResponseType = HttpResponse<IPriceInterval>;
type EntityArrayResponseType = HttpResponse<IPriceInterval[]>;

@Injectable({ providedIn: 'root' })
export class PriceIntervalService {
    public resourceUrl = SERVER_API_URL + 'api/price-intervals';

    constructor(protected http: HttpClient) {}

    create(priceInterval: IPriceInterval): Observable<EntityResponseType> {
        return this.http.post<IPriceInterval>(this.resourceUrl, priceInterval, { observe: 'response' });
    }

    update(priceInterval: IPriceInterval): Observable<EntityResponseType> {
        return this.http.put<IPriceInterval>(this.resourceUrl, priceInterval, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPriceInterval>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPriceInterval[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
