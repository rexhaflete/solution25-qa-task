const { test, expect } = require('@playwright/test');

test.describe('Shopware Checkout Flow - End to End Test', () => {

    test('Should successfully add product to cart and complete checkout', async ({ page }) => {
        await page.goto('https://demo.shopware.com/');
        await page.waitForLoadState('networkidle');

        const productCard = page.locator('.product-box').first();
        await expect(productCard).toBeVisible();
        await productCard.click();

        const addToCartButton = page.locator('.btn-buy, button[type="submit"]');
        await expect(addToCartButton).toBeVisible();
        await addToCartButton.click();

        const proceedToCheckoutButton = page.locator('.offcanvas-cart-actions .btn-primary, .begin-checkout-btn');
        await expect(proceedToCheckoutButton).toBeVisible();
        await proceedToCheckoutButton.click();

        await page.fill('#personalSalutation', 'Mr.');
        await page.fill('#personalFirstName', 'Fleta');
        await page.fill('#personalLastName', 'Rexha');
        await page.fill('#personalMail', 'fleta.test@example.com');
        await page.fill('#billingAddressAddressStreet', 'Hekurudhat 27');
        await page.fill('#billingAddressAddressZipcode', '10000');
        await page.fill('#billingAddressAddressCity', 'Prishtine');

        const cashOnDeliveryRadio = page.locator('label:has-text("Cash on delivery"), #paymentMethod-1');
        if (await cashOnDeliveryRadio.isVisible()) {
            await cashOnDeliveryRadio.click();
        }

        const tosCheckbox = page.locator('#tos, [name="tos"]');
        if (await tosCheckbox.isVisible()) {
            await tosCheckbox.check();
        }

        const submitOrderButton = page.locator('#submitOrderButton, .btn-order');
        await expect(submitOrderButton).toBeEnabled();
        await submitOrderButton.click();

        const successMessage = page.locator('.finish-header, .checkout-finish-title');
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toContainText(['Thank you', 'Faleminderit', 'Order']);
    });
});