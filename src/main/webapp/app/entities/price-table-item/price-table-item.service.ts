import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPriceTableItem } from 'app/shared/model/price-table-item.model';

type EntityResponseType = HttpResponse<IPriceTableItem>;
type EntityArrayResponseType = HttpResponse<IPriceTableItem[]>;

@Injectable({ providedIn: 'root' })
export class PriceTableItemService {
    public resourceUrl = SERVER_API_URL + 'api/price-table-items';

    constructor(protected http: HttpClient) {}

    create(priceTableItem: IPriceTableItem): Observable<EntityResponseType> {
        return this.http.post<IPriceTableItem>(this.resourceUrl, priceTableItem, { observe: 'response' });
    }

    update(priceTableItem: IPriceTableItem): Observable<EntityResponseType> {
        return this.http.put<IPriceTableItem>(this.resourceUrl, priceTableItem, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPriceTableItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPriceTableItem[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
