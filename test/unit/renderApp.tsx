import { render, within } from '@testing-library/react';
import { CartApi_Stub, ExampleApi_Stub } from './api_stub';


import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Application } from '../../src/client/Application';
import { ExampleApi, CartApi } from '../../src/client/api';
import { ApplicationState, initStore } from '../../src/client/store';


export function Render(route = "/", applicationState: ApplicationState = { cart: {}, details: {} })
{
    const api = new ExampleApi_Stub();
    const cart = new CartApi_Stub();
    api.productsInfo = applicationState.products || [];
    api.products = applicationState.details || {};
    cart.state = applicationState.cart;
    const store = initStore(api as unknown as ExampleApi, cart as unknown as CartApi, applicationState);

    const application = (
        <MemoryRouter initialEntries={[route]}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    return { store, ...render(application) };
}

export function createState(inCart = false): ApplicationState
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
	if (inCart) d.cart = {
		1: {
			name: d.details[1].name,
			price: d.details[1].price,
			count: 1,
		},
		2: {
			name: d.details[2].name,
			price: d.details[2].price,
			count: 1,
		},
	}
	return d;
}
