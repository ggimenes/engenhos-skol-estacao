/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PriceTableComponentsPage, PriceTableDeleteDialog, PriceTableUpdatePage } from './price-table.page-object';

const expect = chai.expect;

describe('PriceTable e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let priceTableUpdatePage: PriceTableUpdatePage;
    let priceTableComponentsPage: PriceTableComponentsPage;
    /*let priceTableDeleteDialog: PriceTableDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load PriceTables', async () => {
        await navBarPage.goToEntity('price-table');
        priceTableComponentsPage = new PriceTableComponentsPage();
        await browser.wait(ec.visibilityOf(priceTableComponentsPage.title), 5000);
        expect(await priceTableComponentsPage.getTitle()).to.eq('engenhosSkolEstacaoApp.priceTable.home.title');
    });

    it('should load create PriceTable page', async () => {
        await priceTableComponentsPage.clickOnCreateButton();
        priceTableUpdatePage = new PriceTableUpdatePage();
        expect(await priceTableUpdatePage.getPageTitle()).to.eq('engenhosSkolEstacaoApp.priceTable.home.createOrEditLabel');
        await priceTableUpdatePage.cancel();
    });

    /* it('should create and save PriceTables', async () => {
        const nbButtonsBeforeCreate = await priceTableComponentsPage.countDeleteButtons();

        await priceTableComponentsPage.clickOnCreateButton();
        await promise.all([
            priceTableUpdatePage.setNameInput('name'),
            priceTableUpdatePage.setInitialDateInput('2000-12-31'),
            priceTableUpdatePage.setEndDateInput('2000-12-31'),
            // priceTableUpdatePage.itemsSelectLastOption(),
        ]);
        expect(await priceTableUpdatePage.getNameInput()).to.eq('name');
        expect(await priceTableUpdatePage.getInitialDateInput()).to.eq('2000-12-31');
        expect(await priceTableUpdatePage.getEndDateInput()).to.eq('2000-12-31');
        const selectedActive = priceTableUpdatePage.getActiveInput();
        if (await selectedActive.isSelected()) {
            await priceTableUpdatePage.getActiveInput().click();
            expect(await priceTableUpdatePage.getActiveInput().isSelected()).to.be.false;
        } else {
            await priceTableUpdatePage.getActiveInput().click();
            expect(await priceTableUpdatePage.getActiveInput().isSelected()).to.be.true;
        }
        await priceTableUpdatePage.save();
        expect(await priceTableUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await priceTableComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last PriceTable', async () => {
        const nbButtonsBeforeDelete = await priceTableComponentsPage.countDeleteButtons();
        await priceTableComponentsPage.clickOnLastDeleteButton();

        priceTableDeleteDialog = new PriceTableDeleteDialog();
        expect(await priceTableDeleteDialog.getDialogTitle())
            .to.eq('engenhosSkolEstacaoApp.priceTable.delete.question');
        await priceTableDeleteDialog.clickOnConfirmButton();

        expect(await priceTableComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
