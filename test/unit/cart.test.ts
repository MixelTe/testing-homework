import { it, describe, expect } from '@jest/globals';
import { within } from '@testing-library/react';
import { CartItem } from '../../src/common/types';
import { createState, Render } from './renderApp';


describe('Проверка корзины', () => {
	it('В шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', () =>
	{
		const state = createState(true);
		state.cart[1].count = 3;
		const { getByTestId } = Render("/", state);
		const navbar = getByTestId("navbar");
		const cart = navbar.querySelector('[href$="/cart"]')
		expect(cart).toBeTruthy();
		if (!cart) return;

		expect(cart.innerHTML).toEqual(`Cart (${Object.values(state.cart).length})`);
	});
	it('Должна отображаться таблица с добавленными в нее товарами', () =>
	{
		const state = createState(true);
		state.cart[1].count = 3;
		const { getByTestId } = Render("/cart", state);
		const cart = getByTestId("cart-table");
		const row1 = within(cart).getByTestId<HTMLTableRowElement>("1");
		const row2 = within(cart).getByTestId<HTMLTableRowElement>("2");
		checkRow(row1, state.cart[1]);
		checkRow(row2, state.cart[2]);
	});
	it('Должна отображаться общая сумма заказа', () =>
	{
		const state = createState(true);
		state.cart[1].count = 3;
		const { getByTestId } = Render("/cart", state);
		const cart = getByTestId("cart-table");
		const total = cart.querySelector(".Cart-OrderPrice");
		const totalV = Object.values(state.cart).reduce((p, v) => p + v.count * v.price, 0);
		expect(total?.innerHTML).toBe(`$${totalV}`);
	});
	it('Должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', () =>
	{
		const { store, getByTestId } = Render("/cart", createState(true));
		const btn = getByTestId("cart-clear");
		btn.click();
		expect(Object.values(store.getState().cart).length).toEqual(0);
	});
	it('Если корзина пустая, должна отображаться ссылка на каталог товаров', () =>
	{
		const { getByTestId } = Render("/cart", createState());
		const content = getByTestId("pageContent");
		const link = content.querySelector("a");
		expect(link?.href.endsWith("/catalog")).toBeTruthy();
	});
});


function checkRow(row: HTMLTableRowElement, data: CartItem)
{
	const title = row.querySelector(".Cart-Name");
	const price = row.querySelector(".Cart-Price");
	const count = row.querySelector(".Cart-Count");
	const total = row.querySelector(".Cart-Total");
	expect(title?.innerHTML).toBe(data.name);
	expect(price?.innerHTML).toBe(`$${data.price}`);
	expect(count?.innerHTML).toBe(`${data.count}`);
	expect(total?.innerHTML).toBe(`$${data.price * data.count}`);
}
