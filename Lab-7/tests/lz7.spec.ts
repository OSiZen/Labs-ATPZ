import { test, expect } from '@playwright/test';

test.describe(`Magento website testing`, () => {
    const url = 'https://magento.softwaretestingboard.com/';
    const productName = 'Aim Analog Watch';
    const productQuantityStr = '2';

    const getSearchField = (page) => page.locator('input#search');
    const getProductLink = (page) => page.locator('div[class="search results"] ol>li a.product-item-link');
    const getProductItem = (page) => page.locator('div[class="search results"] ol>li');
    const getProductQuantity = (page) => page.locator('input#qty');
    const getAddToCart = (page) => page.locator('button#product-addtocart-button');
    const getCartCounter = (page) => page.locator('a[class="action showcart"] span[class="counter-number"]');

    test.use({ baseURL: url });

    test(`Step-by-step test execution`, async ({ page }) => {
        await page.goto('/');
        await test.step('Search for product', async () => {
            await getSearchField(page).fill(productName);
            await page.keyboard.press('Enter');
        });
        await test.step(`Verify product appears in search results`, async () => {
            await expect(getProductLink(page).filter({ hasText: productName })).toBeVisible();
        });
        await test.step(`Click on product image`, async () => {
            await getProductItem(page).filter({ has: page.locator(`img[alt="${productName}"]`) }).click();
        });
        await test.step(`Select product quantity`, async () => {
            const quantityInput = getProductQuantity(page);
            await quantityInput.click();
            await quantityInput.fill(productQuantityStr);
            await expect(quantityInput).toHaveValue(productQuantityStr);
        });
        await test.step(`Click on add to cart`, async () => {
            await getAddToCart(page).click();
        });
        await test.step(`Verify added product items count in the cart`, async () => {
            await expect(getCartCounter(page)).toHaveText(productQuantityStr, { timeout: 10000 });
        });
    });
});