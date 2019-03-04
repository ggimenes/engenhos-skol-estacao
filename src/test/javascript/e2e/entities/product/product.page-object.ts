import { element, by, ElementFinder } from 'protractor';

export class ProductComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-product div table .btn-danger'));
    title = element.all(by.css('jhi-product div h2#page-heading span')).first();

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

export class ProductUpdatePage {
    pageTitle = element(by.id('jhi-product-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    activeInput = element(by.id('field_active'));
    slotSelect = element(by.id('field_slot'));
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

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    getActiveInput() {
        return this.activeInput;
    }

    async slotSelectLastOption() {
        await this.slotSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async slotSelectOption(option) {
        await this.slotSelect.sendKeys(option);
    }

    getSlotSelect(): ElementFinder {
        return this.slotSelect;
    }

    async getSlotSelectedOption() {
        return this.slotSelect.element(by.css('option:checked')).getText();
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

export class ProductDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-product-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-product'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
