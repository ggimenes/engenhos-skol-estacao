import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { EngenhosSkolEstacaoSharedModule } from 'app/shared';
import {
    StationComponent,
    StationDetailComponent,
    StationUpdateComponent,
    StationDeletePopupComponent,
    StationDeleteDialogComponent,
    stationRoute,
    stationPopupRoute
} from './';

const ENTITY_STATES = [...stationRoute, ...stationPopupRoute];

@NgModule({
    imports: [EngenhosSkolEstacaoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StationComponent,
        StationDetailComponent,
        StationUpdateComponent,
        StationDeleteDialogComponent,
        StationDeletePopupComponent
    ],
    entryComponents: [StationComponent, StationUpdateComponent, StationDeleteDialogComponent, StationDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EngenhosSkolEstacaoStationModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
