import { Page, test, expect } from '@playwright/test';
import { BasePage } from '../basePage';

export class ProductPage extends BasePage {
    protected readonly productPageLocators = {
        productName: this.page.locator('h1.page-title'),
        quantityInput: this.page.locator('input#qty'),
        addToCartButton: this.page.locator('button#product-addtocart-button'),
        cartCounter: this.page.locator('a[class="action showcart"] span[class="counter-number"]')
    };

    constructor(page: Page) {
        super(page);
    }

    async setProductQuantity(quantity: string): Promise<void> {
        await test.step(`Select product quantity: ${quantity}`, async () => {
            const quantityInput = this.productPageLocators.quantityInput;
            await quantityInput.click();
            await quantityInput.fill(quantity);
            await expect(quantityInput).toHaveValue(quantity);
        });
    }

    async addToCart(): Promise<void> {
        await test.step(`Click on add to cart`, async () => {
            await this.productPageLocators.addToCartButton.click();
        });
    }

    async verifyProductName(expectedName: string) {
        await test.step(`Verify product name: ${expectedName}`, async () => {
            await expect(this.productPageLocators.productName).toHaveText(expectedName);
        });
    }

    async verifyCartCounter(expectedCount: string): Promise<void> {
        await test.step(`Verify added product items count in the cart`, async () => {
            await expect(this.productPageLocators.cartCounter).toHaveText(expectedCount, { timeout: 10000 });
        });
    }
}