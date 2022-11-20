const { assert } = require('chai');

describe('Проверка корзины', async function() {
    it('Содержимое должно сохраняться между перезагрузками страницы', async function ()
    {
        await this.browser.url('http://localhost:3000/hw/store/catalog');

        await this.browser.waitUntil(async () => await this.browser.$$(".ProductItem-DetailsLink")[0].isExisting(), { interval: 100 });
        await this.browser.$$(".ProductItem-DetailsLink")[0].click();

        await this.browser.waitUntil(async () => await this.browser.$("button.ProductDetails-AddToCart").isExisting(), { interval: 100 });
        await this.browser.$("button.ProductDetails-AddToCart").click();
        await this.browser.$('[href$="/catalog"]').click();

        await this.browser.waitUntil(async () => await this.browser.$$(".ProductItem-DetailsLink")[1].isExisting(), { interval: 100 });
        await this.browser.$$(".ProductItem-DetailsLink")[1].click();

        await this.browser.waitUntil(async () => await this.browser.$("button.ProductDetails-AddToCart").isExisting(), { interval: 100 });
        await this.browser.$("button.ProductDetails-AddToCart").click();
        await this.browser.$('[href$="/cart"]').click();

        await this.browser.waitUntil(async () => await this.browser.$('[data-testid="cart-table"] tr[data-testid]').isExisting(), { interval: 100 });
        const items = await this.browser.$$('[data-testid="cart-table"] tr[data-testid]').length;

        await this.browser.refresh();

        await this.browser.waitUntil(async () => await this.browser.$('[data-testid="cart-table"] tr[data-testid]').isExisting(), { interval: 100 });
        const itemsAfterReload = await this.browser.$$('[data-testid="cart-table"] tr[data-testid]').length;

        assert(items === itemsAfterReload, "Количество товаров в корзине не должно измениться");
    });
});