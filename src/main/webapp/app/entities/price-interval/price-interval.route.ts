import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PriceInterval } from 'app/shared/model/price-interval.model';
import { PriceIntervalService } from './price-interval.service';
import { PriceIntervalComponent } from './price-interval.component';
import { PriceIntervalDetailComponent } from './price-interval-detail.component';
import { PriceIntervalUpdateComponent } from './price-interval-update.component';
import { PriceIntervalDeletePopupComponent } from './price-interval-delete-dialog.component';
import { IPriceInterval } from 'app/shared/model/price-interval.model';

@Injectable({ providedIn: 'root' })
export class PriceIntervalResolve implements Resolve<IPriceInterval> {
    constructor(private service: PriceIntervalService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPriceInterval> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PriceInterval>) => response.ok),
                map((priceInterval: HttpResponse<PriceInterval>) => priceInterval.body)
            );
        }
        return of(new PriceInterval());
    }
}

export const priceIntervalRoute: Routes = [
    {
        path: '',
        component: PriceIntervalComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'engenhosSkolEstacaoApp.priceInterval.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PriceIntervalDetailComponent,
        resolve: {
            priceInterval: PriceIntervalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'engenhosSkolEstacaoApp.priceInterval.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PriceIntervalUpdateComponent,
        resolve: {
            priceInterval: PriceIntervalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'engenhosSkolEstacaoApp.priceInterval.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PriceIntervalUpdateComponent,
        resolve: {
            priceInterval: PriceIntervalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'engenhosSkolEstacaoApp.priceInterval.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const priceIntervalPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PriceIntervalDeletePopupComponent,
        resolve: {
            priceInterval: PriceIntervalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'engenhosSkolEstacaoApp.priceInterval.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
