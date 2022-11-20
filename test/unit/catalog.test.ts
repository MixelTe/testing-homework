import { within } from '@testing-library/react';
import { it, describe, expect, test } from '@jest/globals';
import { Render } from './renderApp';
import { Product } from '../../src/common/types';
import { ApplicationState } from '../../src/client/store';


describe('Проверка каталога', () => {
	it('В каталоге должны отображаться товары, для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', () => {
		const state = createState();
		const { getByTestId } = Render("/catalog", state);
		const items = getByTestId("catalog-items");
		const item1 = within(items).getByTestId("1");
		const item2 = within(items).getByTestId("2");
		const item3 = within(items).getByTestId("3");
		checkItem(item1, state.details[1]);
		checkItem(item2, state.details[2]);
		checkItem(item3, state.details[3]);
	});
});

describe('На странице с подробной информацией о товаре отображаются элементы', () => {
	test.each([
		['Название', ".ProductDetails-Name", "name"],
		['Описание', ".ProductDetails-Description", "description"],
		['Цена', ".ProductDetails-Price", (d: Product) => `$${d.price}`],
		['Цвет', ".ProductDetails-Color", "color"],
		['Материал', ".ProductDetails-Material", "material"],
	])("%s товара", (_: string, cls: string, dataField: keyof Product | ((v: Product) => string)) =>
	{
		const state = createState();
		const i = 1;
		const data = state.details[i];
		const { getByTestId } = Render(`/catalog/${i}`, state);
		const content = getByTestId("pageContent");

		const title = content.querySelector(cls);
		let expected = typeof dataField == "string" ? data[dataField] : dataField(data);
		expect(title?.innerHTML).toBe(expected);
	});
	it('Кнопка "добавить в корзину"', () =>
	{
		const { getByTestId } = Render("/catalog/1", createState());
		const content = getByTestId("pageContent");

		const btn = content.querySelector(".ProductDetails-AddToCart");
		expect(btn).toBeTruthy();
	});
});


function createState(): ApplicationState
{
	const d: ApplicationState = {
		cart: {},
		details: {
			1: {
				id: 1,
				color: "red",
				description: "Lorem ipsum",
				material: "leather",
				name: "The book",
				price: 10,
			},
			2: {
				id: 2,
				color: "blue",
				description: "Ipsum lorem",
				material: "wood",
				name: "table",
				price: 253,
			},
			3: {
				id: 3,
				color: "green",
				description: "Hendigr manus",
				material: "stone",
				name: "The Stone",
				price: 9999,
			},
		},
	}
	d.products = Object.values(d.details);
	return d;
}

function checkItem(item: HTMLElement, data: Product)
{
	const title = item.querySelector(".ProductItem-Name");
	const price = item.querySelector(".ProductItem-Price");
	const link = item.querySelector(".ProductItem-DetailsLink");
	expect(title?.innerHTML).toBe(data.name);
	expect(price?.innerHTML).toBe(`$${data.price}`);
	expect(link instanceof HTMLAnchorElement).toBeTruthy();
	if (link instanceof HTMLAnchorElement)
		expect(link.href.endsWith(`/catalog/${data.id}`)).toBeTruthy;
}
