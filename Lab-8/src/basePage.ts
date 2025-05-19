import { Page, test, expect } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async verifyPageURL(expectedUrl: string): Promise<void> {
        await test.step(`Verify page URL: ${expectedUrl}`, async () => {
            await expect(this.page).toHaveURL(expectedUrl);
        });
    }
}