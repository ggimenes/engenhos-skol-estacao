import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PriceTableItem } from 'app/shared/model/price-table-item.model';
import { PriceTableItemService } from './price-table-item.service';
import { PriceTableItemComponent } from './price-table-item.component';
import { PriceTableItemDetailComponent } from './price-table-item-detail.component';
import { PriceTableItemUpdateComponent } from './price-table-item-update.component';
import { PriceTableItemDeletePopupComponent } from './price-table-item-delete-dialog.component';
import { IPriceTableItem } from 'app/shared/model/price-table-item.model';

@Injectable({ providedIn: 'root' })
export class PriceTableItemResolve implements Resolve<IPriceTableItem> {
    constructor(private service: PriceTableItemService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPriceTableItem> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PriceTableItem>) => response.ok),
                map((priceTableItem: HttpResponse<PriceTableItem>) => priceTableItem.body)
            );
        }
        return of(new PriceTableItem());
    }
}

export const priceTableItemRoute: Routes = [
    {
        path: '',
        component: PriceTableItemComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'engenhosSkolEstacaoApp.priceTableItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PriceTableItemDetailComponent,
        resolve: {
            priceTableItem: PriceTableItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'engenhosSkolEstacaoApp.priceTableItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PriceTableItemUpdateComponent,
        resolve: {
            priceTableItem: PriceTableItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'engenhosSkolEstacaoApp.priceTableItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PriceTableItemUpdateComponent,
        resolve: {
            priceTableItem: PriceTableItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'engenhosSkolEstacaoApp.priceTableItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const priceTableItemPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PriceTableItemDeletePopupComponent,
        resolve: {
            priceTableItem: PriceTableItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'engenhosSkolEstacaoApp.priceTableItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
