import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { EngenhosSkolEstacaoSharedModule } from 'app/shared';
import {
    PriceIntervalComponent,
    PriceIntervalDetailComponent,
    PriceIntervalUpdateComponent,
    PriceIntervalDeletePopupComponent,
    PriceIntervalDeleteDialogComponent,
    priceIntervalRoute,
    priceIntervalPopupRoute
} from './';

const ENTITY_STATES = [...priceIntervalRoute, ...priceIntervalPopupRoute];

@NgModule({
    imports: [EngenhosSkolEstacaoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PriceIntervalComponent,
        PriceIntervalDetailComponent,
        PriceIntervalUpdateComponent,
        PriceIntervalDeleteDialogComponent,
        PriceIntervalDeletePopupComponent
    ],
    entryComponents: [
        PriceIntervalComponent,
        PriceIntervalUpdateComponent,
        PriceIntervalDeleteDialogComponent,
        PriceIntervalDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EngenhosSkolEstacaoPriceIntervalModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
