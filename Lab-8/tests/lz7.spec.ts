import { test } from '@playwright/test';
import { HomePage } from '../src/magento/homePage';
import { ProductPage } from '../src/magento/productPage';

test.describe('Magento website testing', () => {
    let homePage: HomePage;
    let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productPage = new ProductPage(page);
        await homePage.load();
    });

    const productName = 'Aim Analog Watch';
    const productQuantityStr = '2';

    test(`Step-by-step test using POM structure`, async () => {
        await homePage.searchProduct(productName);
        await homePage.verifyProductVisible(productName);
        await homePage.clickOnProduct(productName);
        await productPage.verifyProductName(productName);
        await productPage.setProductQuantity(productQuantityStr);
        await productPage.addToCart();
        await productPage.verifyCartCounter(productQuantityStr);
    });
});