import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { EngenhosSkolEstacaoSharedLibsModule, EngenhosSkolEstacaoSharedCommonModule, HasAnyAuthorityDirective } from './';

@NgModule({
    imports: [EngenhosSkolEstacaoSharedLibsModule, EngenhosSkolEstacaoSharedCommonModule],
    declarations: [HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    exports: [EngenhosSkolEstacaoSharedCommonModule, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EngenhosSkolEstacaoSharedModule {
    static forRoot() {
        return {
            ngModule: EngenhosSkolEstacaoSharedModule
        };
    }
}
