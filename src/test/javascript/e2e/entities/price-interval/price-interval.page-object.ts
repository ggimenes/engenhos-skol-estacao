import { element, by, ElementFinder } from 'protractor';

export class PriceIntervalComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-price-interval div table .btn-danger'));
    title = element.all(by.css('jhi-price-interval div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PriceIntervalUpdatePage {
    pageTitle = element(by.id('jhi-price-interval-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    initialMinutesInput = element(by.id('field_initialMinutes'));
    finalMinutesInput = element(by.id('field_finalMinutes'));
    priceTableItemSelect = element(by.id('field_priceTableItem'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setInitialMinutesInput(initialMinutes) {
        await this.initialMinutesInput.sendKeys(initialMinutes);
    }

    async getInitialMinutesInput() {
        return this.initialMinutesInput.getAttribute('value');
    }

    async setFinalMinutesInput(finalMinutes) {
        await this.finalMinutesInput.sendKeys(finalMinutes);
    }

    async getFinalMinutesInput() {
        return this.finalMinutesInput.getAttribute('value');
    }

    async priceTableItemSelectLastOption() {
        await this.priceTableItemSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async priceTableItemSelectOption(option) {
        await this.priceTableItemSelect.sendKeys(option);
    }

    getPriceTableItemSelect(): ElementFinder {
        return this.priceTableItemSelect;
    }

    async getPriceTableItemSelectedOption() {
        return this.priceTableItemSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class PriceIntervalDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-priceInterval-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-priceInterval'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
