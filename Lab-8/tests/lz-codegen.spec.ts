import { test } from '@playwright/test';
import { HomePage } from '../src/rozetka/homePage';
import { ProductPage } from '../src/rozetka/productPage';

test.describe('Rozetka website testing', () => {
    let homePage: HomePage;
    let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productPage = new ProductPage(page);
        await homePage.load();
    });

    const productName = 'Мережеве сховище Synology DS224+';

    test(`Step-by-step test using POM structure`, async () => {
        await homePage.verifyPageURL('https://rozetka.com.ua/');
        await homePage.searchProduct(productName);
        await homePage.verifyProductVisible(productName);
        await homePage.clickOnProduct(productName);
        await productPage.verifyProductName(productName);
        await productPage.verifyAvailabilityStatus();
        await productPage.verifyProductPrice();
    });
});