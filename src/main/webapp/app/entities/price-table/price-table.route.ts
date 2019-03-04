import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PriceTable } from 'app/shared/model/price-table.model';
import { PriceTableService } from './price-table.service';
import { PriceTableComponent } from './price-table.component';
import { PriceTableDetailComponent } from './price-table-detail.component';
import { PriceTableUpdateComponent } from './price-table-update.component';
import { PriceTableDeletePopupComponent } from './price-table-delete-dialog.component';
import { IPriceTable } from 'app/shared/model/price-table.model';

@Injectable({ providedIn: 'root' })
export class PriceTableResolve implements Resolve<IPriceTable> {
    constructor(private service: PriceTableService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPriceTable> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PriceTable>) => response.ok),
                map((priceTable: HttpResponse<PriceTable>) => priceTable.body)
            );
        }
        return of(new PriceTable());
    }
}

export const priceTableRoute: Routes = [
    {
        path: '',
        component: PriceTableComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'engenhosSkolEstacaoApp.priceTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PriceTableDetailComponent,
        resolve: {
            priceTable: PriceTableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'engenhosSkolEstacaoApp.priceTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PriceTableUpdateComponent,
        resolve: {
            priceTable: PriceTableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'engenhosSkolEstacaoApp.priceTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PriceTableUpdateComponent,
        resolve: {
            priceTable: PriceTableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'engenhosSkolEstacaoApp.priceTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const priceTablePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PriceTableDeletePopupComponent,
        resolve: {
            priceTable: PriceTableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'engenhosSkolEstacaoApp.priceTable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
