/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PriceIntervalComponentsPage, PriceIntervalDeleteDialog, PriceIntervalUpdatePage } from './price-interval.page-object';

const expect = chai.expect;

describe('PriceInterval e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let priceIntervalUpdatePage: PriceIntervalUpdatePage;
    let priceIntervalComponentsPage: PriceIntervalComponentsPage;
    let priceIntervalDeleteDialog: PriceIntervalDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load PriceIntervals', async () => {
        await navBarPage.goToEntity('price-interval');
        priceIntervalComponentsPage = new PriceIntervalComponentsPage();
        await browser.wait(ec.visibilityOf(priceIntervalComponentsPage.title), 5000);
        expect(await priceIntervalComponentsPage.getTitle()).to.eq('engenhosSkolEstacaoApp.priceInterval.home.title');
    });

    it('should load create PriceInterval page', async () => {
        await priceIntervalComponentsPage.clickOnCreateButton();
        priceIntervalUpdatePage = new PriceIntervalUpdatePage();
        expect(await priceIntervalUpdatePage.getPageTitle()).to.eq('engenhosSkolEstacaoApp.priceInterval.home.createOrEditLabel');
        await priceIntervalUpdatePage.cancel();
    });

    it('should create and save PriceIntervals', async () => {
        const nbButtonsBeforeCreate = await priceIntervalComponentsPage.countDeleteButtons();

        await priceIntervalComponentsPage.clickOnCreateButton();
        await promise.all([
            priceIntervalUpdatePage.setNameInput('name'),
            priceIntervalUpdatePage.setInitialMinutesInput('5'),
            priceIntervalUpdatePage.setFinalMinutesInput('5'),
            priceIntervalUpdatePage.priceTableItemSelectLastOption()
        ]);
        expect(await priceIntervalUpdatePage.getNameInput()).to.eq('name');
        expect(await priceIntervalUpdatePage.getInitialMinutesInput()).to.eq('5');
        expect(await priceIntervalUpdatePage.getFinalMinutesInput()).to.eq('5');
        await priceIntervalUpdatePage.save();
        expect(await priceIntervalUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await priceIntervalComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last PriceInterval', async () => {
        const nbButtonsBeforeDelete = await priceIntervalComponentsPage.countDeleteButtons();
        await priceIntervalComponentsPage.clickOnLastDeleteButton();

        priceIntervalDeleteDialog = new PriceIntervalDeleteDialog();
        expect(await priceIntervalDeleteDialog.getDialogTitle()).to.eq('engenhosSkolEstacaoApp.priceInterval.delete.question');
        await priceIntervalDeleteDialog.clickOnConfirmButton();

        expect(await priceIntervalComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
