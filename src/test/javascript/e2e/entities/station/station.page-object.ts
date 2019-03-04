import { element, by, ElementFinder } from 'protractor';

export class StationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-station div table .btn-danger'));
    title = element.all(by.css('jhi-station div h2#page-heading span')).first();

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

export class StationUpdatePage {
    pageTitle = element(by.id('jhi-station-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    codeInput = element(by.id('field_code'));
    streetAddressInput = element(by.id('field_streetAddress'));
    streetNumberInput = element(by.id('field_streetNumber'));
    districtInput = element(by.id('field_district'));
    cityInput = element(by.id('field_city'));
    stateInput = element(by.id('field_state'));
    zipCodeInput = element(by.id('field_zipCode'));
    countryInput = element(by.id('field_country'));
    slotSelect = element(by.id('field_slot'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setCodeInput(code) {
        await this.codeInput.sendKeys(code);
    }

    async getCodeInput() {
        return this.codeInput.getAttribute('value');
    }

    async setStreetAddressInput(streetAddress) {
        await this.streetAddressInput.sendKeys(streetAddress);
    }

    async getStreetAddressInput() {
        return this.streetAddressInput.getAttribute('value');
    }

    async setStreetNumberInput(streetNumber) {
        await this.streetNumberInput.sendKeys(streetNumber);
    }

    async getStreetNumberInput() {
        return this.streetNumberInput.getAttribute('value');
    }

    async setDistrictInput(district) {
        await this.districtInput.sendKeys(district);
    }

    async getDistrictInput() {
        return this.districtInput.getAttribute('value');
    }

    async setCityInput(city) {
        await this.cityInput.sendKeys(city);
    }

    async getCityInput() {
        return this.cityInput.getAttribute('value');
    }

    async setStateInput(state) {
        await this.stateInput.sendKeys(state);
    }

    async getStateInput() {
        return this.stateInput.getAttribute('value');
    }

    async setZipCodeInput(zipCode) {
        await this.zipCodeInput.sendKeys(zipCode);
    }

    async getZipCodeInput() {
        return this.zipCodeInput.getAttribute('value');
    }

    async setCountryInput(country) {
        await this.countryInput.sendKeys(country);
    }

    async getCountryInput() {
        return this.countryInput.getAttribute('value');
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

export class StationDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-station-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-station'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
