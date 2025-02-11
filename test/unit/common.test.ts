import { it, describe, expect } from '@jest/globals';
import { Render } from './renderApp';


describe('Проверка общих требований', () => {
    it('Вёрстка должна адаптироваться под ширину экрана', () =>
    {
        const { getByTestId } = Render();
        expect(getByTestId("home-desc").classList).toContain("row");
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

        expect(links.some(v => /\/catalog$/.test(v))).toBeTruthy();
        expect(links.some(v => /\/delivery$/.test(v))).toBeTruthy();
        expect(links.some(v => /\/contacts$/.test(v))).toBeTruthy();
        expect(links.some(v => /\/cart$/.test(v))).toBeTruthy();
    });

    it('Название магазина в шапке должно быть ссылкой на главную страницу', () =>
    {
        const { container } = Render();
        const brand = container.querySelector("nav .navbar-brand");
        expect(brand).toBeTruthy();
        expect(brand instanceof HTMLAnchorElement).toBeTruthy();
        if (!brand || !(brand instanceof HTMLAnchorElement)) return;

        expect(/\/$/.test(brand.href)).toBeTruthy();
    });

    it('На ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', () =>
    {
        const { getByTestId } = Render();
        expect(getByTestId("navbar-toggler").classList).toContain("navbar-toggler");
        expect(getByTestId("navbar").classList).toContain("navbar-collapse");
    });

    it('При выборе элемента из меню "гамбургера", меню должно закрываться', () =>
    {
        const { getByTestId } = Render();
        const toggler = getByTestId("navbar-toggler");
        const navbar = getByTestId("navbar");
        const link = navbar.querySelector("a");

        expect(link).toBeTruthy();
        if (!link) return;

        expect(navbar.classList).toContain("collapse");
        toggler.click();
        expect(navbar.classList).not.toContain("collapse");
        link.click();
        expect(navbar.classList).toContain("collapse");
    });
});
