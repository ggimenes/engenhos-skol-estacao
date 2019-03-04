/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SlotComponentsPage, SlotDeleteDialog, SlotUpdatePage } from './slot.page-object';

const expect = chai.expect;

describe('Slot e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let slotUpdatePage: SlotUpdatePage;
    let slotComponentsPage: SlotComponentsPage;
    /*let slotDeleteDialog: SlotDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Slots', async () => {
        await navBarPage.goToEntity('slot');
        slotComponentsPage = new SlotComponentsPage();
        await browser.wait(ec.visibilityOf(slotComponentsPage.title), 5000);
        expect(await slotComponentsPage.getTitle()).to.eq('engenhosSkolEstacaoApp.slot.home.title');
    });

    it('should load create Slot page', async () => {
        await slotComponentsPage.clickOnCreateButton();
        slotUpdatePage = new SlotUpdatePage();
        expect(await slotUpdatePage.getPageTitle()).to.eq('engenhosSkolEstacaoApp.slot.home.createOrEditLabel');
        await slotUpdatePage.cancel();
    });

    /* it('should create and save Slots', async () => {
        const nbButtonsBeforeCreate = await slotComponentsPage.countDeleteButtons();

        await slotComponentsPage.clickOnCreateButton();
        await promise.all([
            slotUpdatePage.setNumberInput('number'),
            slotUpdatePage.setPositionXInput('5'),
            slotUpdatePage.setPositionYInput('5'),
        ]);
        expect(await slotUpdatePage.getNumberInput()).to.eq('number');
        expect(await slotUpdatePage.getPositionXInput()).to.eq('5');
        expect(await slotUpdatePage.getPositionYInput()).to.eq('5');
        await slotUpdatePage.save();
        expect(await slotUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await slotComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last Slot', async () => {
        const nbButtonsBeforeDelete = await slotComponentsPage.countDeleteButtons();
        await slotComponentsPage.clickOnLastDeleteButton();

        slotDeleteDialog = new SlotDeleteDialog();
        expect(await slotDeleteDialog.getDialogTitle())
            .to.eq('engenhosSkolEstacaoApp.slot.delete.question');
        await slotDeleteDialog.clickOnConfirmButton();

        expect(await slotComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
