import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Slot } from 'app/shared/model/slot.model';
import { SlotService } from './slot.service';
import { SlotComponent } from './slot.component';
import { SlotDetailComponent } from './slot-detail.component';
import { SlotUpdateComponent } from './slot-update.component';
import { SlotDeletePopupComponent } from './slot-delete-dialog.component';
import { ISlot } from 'app/shared/model/slot.model';

@Injectable({ providedIn: 'root' })
export class SlotResolve implements Resolve<ISlot> {
    constructor(private service: SlotService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISlot> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Slot>) => response.ok),
                map((slot: HttpResponse<Slot>) => slot.body)
            );
        }
        return of(new Slot());
    }
}

export const slotRoute: Routes = [
    {
        path: '',
        component: SlotComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'engenhosSkolEstacaoApp.slot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SlotDetailComponent,
        resolve: {
            slot: SlotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'engenhosSkolEstacaoApp.slot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SlotUpdateComponent,
        resolve: {
            slot: SlotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'engenhosSkolEstacaoApp.slot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SlotUpdateComponent,
        resolve: {
            slot: SlotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'engenhosSkolEstacaoApp.slot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const slotPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SlotDeletePopupComponent,
        resolve: {
            slot: SlotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'engenhosSkolEstacaoApp.slot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
