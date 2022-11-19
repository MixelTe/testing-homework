import { CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo } from '../../src/common/types';

export class ExampleApi_Stub
{
    public productsInfo: ProductShortInfo[] = [];
    public products: { [id: string]: Product } = {};
    public orderId = 1;
    async getProducts()
    {
        return await Promise.resolve(this.productsInfo);
    }

    async getProductById(id: number)
    {
        return await Promise.resolve(this.products[id]);
    }

    async checkout(form: CheckoutFormData, cart: CartState)
    {
        const r: CheckoutResponse = { id: this.orderId };
        return await Promise.resolve({ data: r });
    }
}

export const LOCAL_STORAGE_CART_KEY = 'example-store-cart';

export class CartApi_Stub
{
    public state: CartState = {};
    getState(): CartState
    {
        return this.state;
    }
    setState(cart: CartState)
    {
        this.state = cart;
    }
}
