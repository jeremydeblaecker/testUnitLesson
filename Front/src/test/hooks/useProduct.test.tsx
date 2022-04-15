import {rest} from "msw";
import {setupServer} from "msw/node";
import { renderHook, act } from '@testing-library/react-hooks'
import useProduct from "../../hooks/useProduct";


const server = setupServer(
    rest.get(
        "http://localhost:8000/api/cart/1",
        (req, res, ctx) => {
            return res(
                ctx.json({
                    products: [{
                        id: 1,
                        name: 'Summer Smith',
                        price: '15',
                        quantity: 5,
                        image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'
                    }]}))}))


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


test("add product", async () => {
    const {result} = renderHook(() => useProduct({
        id: 15,
        image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg',
        name: 'Alien Rick',
        price: '20',
        quantity: 20
    }));

    const {loading, addProduct} = result.current;
    expect(loading).toEqual(true);
    await act(async () => {
        await addProduct()
    });
    
})

