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

    return render(application);
}
