import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { EngenhosSkolEstacaoSharedModule } from 'app/shared';
import {
    PriceTableItemComponent,
    PriceTableItemDetailComponent,
    PriceTableItemUpdateComponent,
    PriceTableItemDeletePopupComponent,
    PriceTableItemDeleteDialogComponent,
    priceTableItemRoute,
    priceTableItemPopupRoute
} from './';

const ENTITY_STATES = [...priceTableItemRoute, ...priceTableItemPopupRoute];

@NgModule({
    imports: [EngenhosSkolEstacaoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PriceTableItemComponent,
        PriceTableItemDetailComponent,
        PriceTableItemUpdateComponent,
        PriceTableItemDeleteDialogComponent,
        PriceTableItemDeletePopupComponent
    ],
    entryComponents: [
        PriceTableItemComponent,
        PriceTableItemUpdateComponent,
        PriceTableItemDeleteDialogComponent,
        PriceTableItemDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EngenhosSkolEstacaoPriceTableItemModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
