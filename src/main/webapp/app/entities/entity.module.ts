import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'user-extra',
                loadChildren: './user-extra/user-extra.module#EngenhosSkolEstacaoUserExtraModule'
            },
            {
                path: 'product',
                loadChildren: './product/product.module#EngenhosSkolEstacaoProductModule'
            },
            {
                path: 'station',
                loadChildren: './station/station.module#EngenhosSkolEstacaoStationModule'
            },
            {
                path: 'slot',
                loadChildren: './slot/slot.module#EngenhosSkolEstacaoSlotModule'
            },
            {
                path: 'price-table',
                loadChildren: './price-table/price-table.module#EngenhosSkolEstacaoPriceTableModule'
            },
            {
                path: 'price-table-item',
                loadChildren: './price-table-item/price-table-item.module#EngenhosSkolEstacaoPriceTableItemModule'
            },
            {
                path: 'price-interval',
                loadChildren: './price-interval/price-interval.module#EngenhosSkolEstacaoPriceIntervalModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EngenhosSkolEstacaoEntityModule {}
