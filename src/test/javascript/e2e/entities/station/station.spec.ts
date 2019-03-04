/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StationComponentsPage, StationDeleteDialog, StationUpdatePage } from './station.page-object';

const expect = chai.expect;

describe('Station e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let stationUpdatePage: StationUpdatePage;
    let stationComponentsPage: StationComponentsPage;
    let stationDeleteDialog: StationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Stations', async () => {
        await navBarPage.goToEntity('station');
        stationComponentsPage = new StationComponentsPage();
        await browser.wait(ec.visibilityOf(stationComponentsPage.title), 5000);
        expect(await stationComponentsPage.getTitle()).to.eq('engenhosSkolEstacaoApp.station.home.title');
    });

    it('should load create Station page', async () => {
        await stationComponentsPage.clickOnCreateButton();
        stationUpdatePage = new StationUpdatePage();
        expect(await stationUpdatePage.getPageTitle()).to.eq('engenhosSkolEstacaoApp.station.home.createOrEditLabel');
        await stationUpdatePage.cancel();
    });

    it('should create and save Stations', async () => {
        const nbButtonsBeforeCreate = await stationComponentsPage.countDeleteButtons();

        await stationComponentsPage.clickOnCreateButton();
        await promise.all([
            stationUpdatePage.setNameInput('name'),
            stationUpdatePage.setCodeInput('code'),
            stationUpdatePage.setStreetAddressInput('streetAddress'),
            stationUpdatePage.setStreetNumberInput('streetNumber'),
            stationUpdatePage.setDistrictInput('district'),
            stationUpdatePage.setCityInput('city'),
            stationUpdatePage.setStateInput('state'),
            stationUpdatePage.setZipCodeInput('zipCode'),
            stationUpdatePage.setCountryInput('country'),
            stationUpdatePage.slotSelectLastOption()
        ]);
        expect(await stationUpdatePage.getNameInput()).to.eq('name');
        expect(await stationUpdatePage.getCodeInput()).to.eq('code');
        expect(await stationUpdatePage.getStreetAddressInput()).to.eq('streetAddress');
        expect(await stationUpdatePage.getStreetNumberInput()).to.eq('streetNumber');
        expect(await stationUpdatePage.getDistrictInput()).to.eq('district');
        expect(await stationUpdatePage.getCityInput()).to.eq('city');
        expect(await stationUpdatePage.getStateInput()).to.eq('state');
        expect(await stationUpdatePage.getZipCodeInput()).to.eq('zipCode');
        expect(await stationUpdatePage.getCountryInput()).to.eq('country');
        await stationUpdatePage.save();
        expect(await stationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await stationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Station', async () => {
        const nbButtonsBeforeDelete = await stationComponentsPage.countDeleteButtons();
        await stationComponentsPage.clickOnLastDeleteButton();

        stationDeleteDialog = new StationDeleteDialog();
        expect(await stationDeleteDialog.getDialogTitle()).to.eq('engenhosSkolEstacaoApp.station.delete.question');
        await stationDeleteDialog.clickOnConfirmButton();

        expect(await stationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
