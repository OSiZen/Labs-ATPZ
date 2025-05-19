import { Page, test, expect } from '@playwright/test';
import { BasePage } from '../basePage';

export class HomePage extends BasePage {
    private readonly BASE_URL = 'https://rozetka.com.ua/';
    
    protected readonly homePageLocators = {
        searchInput: this.page.locator('.header-search input'),
        productLink: this.page.locator('li.search-suggest__item a')
    };

    constructor(page: Page) {
        super(page);
    }

    async load(): Promise<void> {
        await this.goTo(this.BASE_URL);
    }

    async searchProduct(expectedName: string): Promise<void> {
        await test.step(`Search for product: ${expectedName}`, async () => {
            await this.homePageLocators.searchInput.click();
            await this.homePageLocators.searchInput.fill(expectedName);
        });
    }

    async verifyProductVisible(expectedName: string): Promise<void> {
        await test.step(`Verify product appears in search suggestions`, async () => {
            await expect(this.homePageLocators.productLink.filter({ hasText: expectedName })).toBeVisible();
        });
    }

    async clickOnProduct(expectedName: string): Promise<void> {
        await test.step(`Click on the found product`, async () => {
            await this.homePageLocators.productLink.filter({ hasText: expectedName }).click();
        });
    }
}