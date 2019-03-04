import { element, by, ElementFinder } from 'protractor';

export class PriceTableComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-price-table div table .btn-danger'));
    title = element.all(by.css('jhi-price-table div h2#page-heading span')).first();

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

export class PriceTableUpdatePage {
    pageTitle = element(by.id('jhi-price-table-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    initialDateInput = element(by.id('field_initialDate'));
    endDateInput = element(by.id('field_endDate'));
    activeInput = element(by.id('field_active'));
    itemsSelect = element(by.id('field_items'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setInitialDateInput(initialDate) {
        await this.initialDateInput.sendKeys(initialDate);
    }

    async getInitialDateInput() {
        return this.initialDateInput.getAttribute('value');
    }

    async setEndDateInput(endDate) {
        await this.endDateInput.sendKeys(endDate);
    }

    async getEndDateInput() {
        return this.endDateInput.getAttribute('value');
    }

    getActiveInput() {
        return this.activeInput;
    }

    async itemsSelectLastOption() {
        await this.itemsSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async itemsSelectOption(option) {
        await this.itemsSelect.sendKeys(option);
    }

    getItemsSelect(): ElementFinder {
        return this.itemsSelect;
    }

    async getItemsSelectedOption() {
        return this.itemsSelect.element(by.css('option:checked')).getText();
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

export class PriceTableDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-priceTable-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-priceTable'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
