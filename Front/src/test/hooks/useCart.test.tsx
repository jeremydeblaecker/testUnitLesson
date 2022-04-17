import {rest} from "msw";
import {setupServer} from "msw/node";
import { renderHook, act } from '@testing-library/react-hooks'
import { render, screen, waitFor } from "@testing-library/react";
import useCart from "../../hooks/useCart";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import Cart from "../../components/Cart";


let container: any;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

const server = setupServer(
    rest.get(
        "http://localhost:8000/api/cart",
        (req, res, ctx) => {
            return res(
                ctx.json([{
                    id: 3,
                    name: 'Summer Smith',
                    price: '15',
                    quantity: 5,
                    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'
                },
                {
                    id: 15,
                    name: 'Alien Rick',
                    price: '20',
                    quantity: 20,
                    image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg'
                },
                {
                    id: 15,
                    name: 'Alien Rick',
                    price: '20',
                    quantity: 20,
                    image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg'
                }
        ]))})
    );

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

    test("load cart", async () => {
        const {result} = renderHook(() => useCart());
        const {loading, loadCart} = result.current;
        expect(loading).toEqual(true);
        await act(async () => {
            await loadCart()
        });
        const {products} = result.current;
    })

    test("load component cart", async () => {
        await act(async ()=>{
           await ReactDOM.render(<Cart setRoute={() => { }} />, container);
        })
        await waitFor(() => expect(screen.getByText("Data")));
    });
