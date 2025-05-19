import { Page, test, expect } from '@playwright/test';
import { BasePage } from '../basePage';

export class ProductPage extends BasePage {
    protected readonly productPageLocators = {
        productName: this.page.locator('h1.title__font'),
        productPrice: this.page.locator('p.product-price__big'),
        availabilityStatus: this.page.locator('p.status-label')
    };

    constructor(page: Page) {
        super(page);
    }

    async verifyProductName(expectedName: string) {
        await test.step(`Verify product name: ${expectedName}`, async () => {
            await expect(this.productPageLocators.productName).toHaveText(expectedName);
        });
    }

    async verifyProductPrice(): Promise<void> {
        await test.step(`Verify product price format`, async () => {
            await expect(this.productPageLocators.productPrice).toHaveText(/^\d+\s\d+₴$/);
        });
    }

    async verifyAvailabilityStatus(): Promise<void> {
        await test.step(`Verify availability status`, async () => {
            await expect(this.productPageLocators.availabilityStatus).toHaveText('Є в наявності');
        });
    }
}