/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PriceTableItemComponentsPage, PriceTableItemDeleteDialog, PriceTableItemUpdatePage } from './price-table-item.page-object';

const expect = chai.expect;

describe('PriceTableItem e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let priceTableItemUpdatePage: PriceTableItemUpdatePage;
    let priceTableItemComponentsPage: PriceTableItemComponentsPage;
    /*let priceTableItemDeleteDialog: PriceTableItemDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load PriceTableItems', async () => {
        await navBarPage.goToEntity('price-table-item');
        priceTableItemComponentsPage = new PriceTableItemComponentsPage();
        await browser.wait(ec.visibilityOf(priceTableItemComponentsPage.title), 5000);
        expect(await priceTableItemComponentsPage.getTitle()).to.eq('engenhosSkolEstacaoApp.priceTableItem.home.title');
    });

    it('should load create PriceTableItem page', async () => {
        await priceTableItemComponentsPage.clickOnCreateButton();
        priceTableItemUpdatePage = new PriceTableItemUpdatePage();
        expect(await priceTableItemUpdatePage.getPageTitle()).to.eq('engenhosSkolEstacaoApp.priceTableItem.home.createOrEditLabel');
        await priceTableItemUpdatePage.cancel();
    });

    /* it('should create and save PriceTableItems', async () => {
        const nbButtonsBeforeCreate = await priceTableItemComponentsPage.countDeleteButtons();

        await priceTableItemComponentsPage.clickOnCreateButton();
        await promise.all([
            priceTableItemUpdatePage.setPriceInput('5'),
        ]);
        expect(await priceTableItemUpdatePage.getPriceInput()).to.eq('5');
        await priceTableItemUpdatePage.save();
        expect(await priceTableItemUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await priceTableItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last PriceTableItem', async () => {
        const nbButtonsBeforeDelete = await priceTableItemComponentsPage.countDeleteButtons();
        await priceTableItemComponentsPage.clickOnLastDeleteButton();

        priceTableItemDeleteDialog = new PriceTableItemDeleteDialog();
        expect(await priceTableItemDeleteDialog.getDialogTitle())
            .to.eq('engenhosSkolEstacaoApp.priceTableItem.delete.question');
        await priceTableItemDeleteDialog.clickOnConfirmButton();

        expect(await priceTableItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
