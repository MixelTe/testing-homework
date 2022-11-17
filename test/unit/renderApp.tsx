import { render } from '@testing-library/react';
import { CartApi_Stub, ExampleApi_Stub } from './api_stub';


import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Application } from '../../src/client/Application';
import { ExampleApi, CartApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';


export function Render(route = "/", apiStub?: ExampleApi_Stub, cartStub?: CartApi_Stub)
{
    const api = apiStub || new ExampleApi_Stub();
    const cart = cartStub || new CartApi_Stub();
    const store = initStore(api as unknown as ExampleApi, cart as unknown as CartApi);

    const application = (
        <MemoryRouter initialEntries={[route]}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    return render(application);
}
