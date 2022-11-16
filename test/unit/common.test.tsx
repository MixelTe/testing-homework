import { it, describe, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Application } from '../../src/client/Application';
import { ExampleApi, CartApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';


function Render()
{
    const basename = '/hw/store';

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Application />
            </Provider>
        </BrowserRouter>
    );

    return render(application);
}


describe('Проверка общих требований', () => {
    it('Вёрстка должна адаптироваться под ширину экрана', () =>
    {
        const { container } = Render();
        expect("Знания").toBe("Достаточно для решения");
    });
    
    it('В шапке отображаются ссылки на страницы магазина, а также ссылка на корзину', () =>
    {
        const { container } = Render();
        const nav = container.querySelector("nav");
        expect(nav).toBeDefined();
        if (!nav) return;
        const linkEls = nav.querySelectorAll("a");
        const links: string[] = [];
        linkEls.forEach(link => links.push(link.href));

        expect(links.some(v => /\/store\/catalog$/.test(v))).toBeTruthy();
        expect(links.some(v => /\/store\/delivery$/.test(v))).toBeTruthy();
        expect(links.some(v => /\/store\/contacts$/.test(v))).toBeTruthy();
        expect(links.some(v => /\/store\/cart$/.test(v))).toBeTruthy();
    });

    it('Название магазина в шапке должно быть ссылкой на главную страницу', () =>
    {
        const { container } = Render();
        const brand = container.querySelector("nav .navbar-brand");
        expect(brand).toBeTruthy();
        expect(brand instanceof HTMLAnchorElement).toBeTruthy();
        if (!brand || !(brand instanceof HTMLAnchorElement)) return;

        expect(/\/store\/$/.test(brand.href)).toBeTruthy();
    });

    it('На ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', () =>
    {
        const { container } = Render();
        expect("Знания").toBe("Достаточно для решения");
    });
});
