import {rest} from "msw";
import {setupServer} from "msw/node";
import { renderHook, act } from '@testing-library/react-hooks'
import { render, screen, waitFor } from "@testing-library/react";
import useHome from "../../hooks/useHome";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import Home from '../../components/Home'

let container: any;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

const server = setupServer(
    rest.get(
        "http://localhost:8000/api/products",
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

    test("load home", async () => {
        const {result} = renderHook(() => useHome());
        const {loading, loadProducts} = result.current;
        expect(loading).toEqual(true);
        await act(async () => {
            await loadProducts()
        });
        const {products} = result.current;
        expect(products).toStrictEqual([{
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
        }]
    );
    });


    test("load component home", async () => {
        await act(async ()=>{
           await ReactDOM.render(<Home setRoute={()=>{}} />, container);
        })
        await waitFor(() => expect(screen.getByText("Data")));
    });