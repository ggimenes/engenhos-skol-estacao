/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserExtraComponentsPage, UserExtraDeleteDialog, UserExtraUpdatePage } from './user-extra.page-object';

const expect = chai.expect;

describe('UserExtra e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let userExtraUpdatePage: UserExtraUpdatePage;
    let userExtraComponentsPage: UserExtraComponentsPage;
    let userExtraDeleteDialog: UserExtraDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load UserExtras', async () => {
        await navBarPage.goToEntity('user-extra');
        userExtraComponentsPage = new UserExtraComponentsPage();
        await browser.wait(ec.visibilityOf(userExtraComponentsPage.title), 5000);
        expect(await userExtraComponentsPage.getTitle()).to.eq('engenhosSkolEstacaoApp.userExtra.home.title');
    });

    it('should load create UserExtra page', async () => {
        await userExtraComponentsPage.clickOnCreateButton();
        userExtraUpdatePage = new UserExtraUpdatePage();
        expect(await userExtraUpdatePage.getPageTitle()).to.eq('engenhosSkolEstacaoApp.userExtra.home.createOrEditLabel');
        await userExtraUpdatePage.cancel();
    });

    it('should create and save UserExtras', async () => {
        const nbButtonsBeforeCreate = await userExtraComponentsPage.countDeleteButtons();

        await userExtraComponentsPage.clickOnCreateButton();
        await promise.all([
            userExtraUpdatePage.setFirstNameInput('firstName'),
            userExtraUpdatePage.setLastNameInput('lastName'),
            userExtraUpdatePage.setCpfInput('cpf'),
            userExtraUpdatePage.setPhoneInput('phone')
        ]);
        expect(await userExtraUpdatePage.getFirstNameInput()).to.eq('firstName');
        expect(await userExtraUpdatePage.getLastNameInput()).to.eq('lastName');
        expect(await userExtraUpdatePage.getCpfInput()).to.eq('cpf');
        expect(await userExtraUpdatePage.getPhoneInput()).to.eq('phone');
        await userExtraUpdatePage.save();
        expect(await userExtraUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await userExtraComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last UserExtra', async () => {
        const nbButtonsBeforeDelete = await userExtraComponentsPage.countDeleteButtons();
        await userExtraComponentsPage.clickOnLastDeleteButton();

        userExtraDeleteDialog = new UserExtraDeleteDialog();
        expect(await userExtraDeleteDialog.getDialogTitle()).to.eq('engenhosSkolEstacaoApp.userExtra.delete.question');
        await userExtraDeleteDialog.clickOnConfirmButton();

        expect(await userExtraComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
