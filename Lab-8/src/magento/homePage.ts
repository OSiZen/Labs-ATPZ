import { Page, test, expect } from '@playwright/test';
import { BasePage } from '../basePage';

export class HomePage extends BasePage {
    private readonly BASE_URL = 'https://magento.softwaretestingboard.com/';
    
    protected readonly homePageLocators = {
        searchInput: this.page.locator('input#search'),
        productLink: this.page.locator('div[class="search results"] ol>li a.product-item-link'),
        productItem: this.page.locator('div[class="search results"] ol>li')
    };

    constructor(page: Page) {
        super(page);
    }

    async load(): Promise<void> {
        await this.goTo(this.BASE_URL);
    }

    async searchProduct(expectedName: string): Promise<void> {
        await test.step(`Search for product: ${expectedName}`, async () => {
            await this.homePageLocators.searchInput.fill(expectedName);
            await this.page.keyboard.press('Enter');
        });
    }

    async verifyProductVisible(expectedName: string): Promise<void> {
        await test.step(`Verify product appears in search results`, async () => {
            await expect(this.homePageLocators.productLink.filter({ hasText: expectedName })).toBeVisible();
        });
    }

    async clickOnProduct(expectedName: string): Promise<void> {
        await test.step(`Click on the found product`, async () => {
            await this.homePageLocators.productLink.filter({ hasText: expectedName }).click();
        });
    }
}