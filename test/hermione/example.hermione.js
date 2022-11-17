const { assert } = require('chai');

describe('github', async function() {
    it('Тест, который пройдет', async function() {
        await this.browser.url('https://ya.ru/');
        await this.browser.keys(["курс доллара к рублю", "Enter"]);
        const converter = await this.browser.$('[data-fast-name="currency_converter"]');
        await converter.waitForExist();
        await this.browser.assertView("plain", '[data-fast-name="currency_converter"]')
    });
});