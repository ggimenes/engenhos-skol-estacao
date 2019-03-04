import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { EngenhosSkolEstacaoSharedModule } from 'app/shared';
import {
    PriceTableComponent,
    PriceTableDetailComponent,
    PriceTableUpdateComponent,
    PriceTableDeletePopupComponent,
    PriceTableDeleteDialogComponent,
    priceTableRoute,
    priceTablePopupRoute
} from './';

const ENTITY_STATES = [...priceTableRoute, ...priceTablePopupRoute];

@NgModule({
    imports: [EngenhosSkolEstacaoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PriceTableComponent,
        PriceTableDetailComponent,
        PriceTableUpdateComponent,
        PriceTableDeleteDialogComponent,
        PriceTableDeletePopupComponent
    ],
    entryComponents: [PriceTableComponent, PriceTableUpdateComponent, PriceTableDeleteDialogComponent, PriceTableDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EngenhosSkolEstacaoPriceTableModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
