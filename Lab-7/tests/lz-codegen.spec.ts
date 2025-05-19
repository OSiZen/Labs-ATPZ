import { test, expect } from '@playwright/test';

test.describe(`Rozetka website testing`, () => {
    const url = 'https://rozetka.com.ua/';
    const productName = 'Мережеве сховище Synology DS224+';

    const getSearchField = (page) => page.locator('.header-search input');
    const getFoundProduct = (page) => page.locator('li.search-suggest__item a', { hasText: productName });
    const getAvailabilityStatus = (page) => page.locator('div.product-price__wrap p.status-label');
    const getProductPrice = (page) => page.locator('div.product-price__wrap p.product-price__big');

    test.use({ baseURL: url });

    test(`Step-by-step test execution`, async ({ page }) => {
        await test.step(`Verify url matches expected value`, async () => {
            await page.goto('/');
            await expect(page).toHaveURL(url);
        });
        await test.step(`Verify product appears in search suggestions`, async () => {
            await getSearchField(page).click();
            await getSearchField(page).fill(productName);
            await expect(getFoundProduct(page)).toBeVisible();
        });
        await test.step(`Click on the found product`, async () => {
            await getFoundProduct(page).click();
        });
        await test.step(`Verify product availability status`, async () => {
            await expect(getAvailabilityStatus(page)).toHaveText('Є в наявності');
        });
        await test.step(`Verify product price`, async () => {
            await expect(getProductPrice(page)).toHaveText(/^\d+\s\d+₴$/);
        });
    });
});
