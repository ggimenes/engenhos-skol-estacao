import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { EngenhosSkolEstacaoSharedModule } from 'app/shared';
import {
    SlotComponent,
    SlotDetailComponent,
    SlotUpdateComponent,
    SlotDeletePopupComponent,
    SlotDeleteDialogComponent,
    slotRoute,
    slotPopupRoute
} from './';

const ENTITY_STATES = [...slotRoute, ...slotPopupRoute];

@NgModule({
    imports: [EngenhosSkolEstacaoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [SlotComponent, SlotDetailComponent, SlotUpdateComponent, SlotDeleteDialogComponent, SlotDeletePopupComponent],
    entryComponents: [SlotComponent, SlotUpdateComponent, SlotDeleteDialogComponent, SlotDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EngenhosSkolEstacaoSlotModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
