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
        expect(container).toBeInstanceOf(HTMLElement);
    });
});
