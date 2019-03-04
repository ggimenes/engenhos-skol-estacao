import { element, by, ElementFinder } from 'protractor';

export class SlotComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-slot div table .btn-danger'));
    title = element.all(by.css('jhi-slot div h2#page-heading span')).first();

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

export class SlotUpdatePage {
    pageTitle = element(by.id('jhi-slot-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    numberInput = element(by.id('field_number'));
    positionXInput = element(by.id('field_positionX'));
    positionYInput = element(by.id('field_positionY'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNumberInput(number) {
        await this.numberInput.sendKeys(number);
    }

    async getNumberInput() {
        return this.numberInput.getAttribute('value');
    }

    async setPositionXInput(positionX) {
        await this.positionXInput.sendKeys(positionX);
    }

    async getPositionXInput() {
        return this.positionXInput.getAttribute('value');
    }

    async setPositionYInput(positionY) {
        await this.positionYInput.sendKeys(positionY);
    }

    async getPositionYInput() {
        return this.positionYInput.getAttribute('value');
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

export class SlotDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-slot-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-slot'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
