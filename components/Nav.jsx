'use client';

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react";
import { useSelectedProductsContext } from "./SelectedProductsContext";

const Nav = () => {

    const [itemNumber, setItemNumber] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const { selectedProducts } = useSelectedProductsContext();

    useEffect(() => {
        console.log('selectedProducts')
        console.log(selectedProducts)

        // Calculate the total sum of (price * quantitySelected) using reduce
        const totalPrice = selectedProducts.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.price * currentObject.quantitySelected;
        }, 0);

        // Calculate the total number of items (sum of quantitySelected) using reduce
        const totalItems = selectedProducts.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.quantitySelected;
        }, 0);

        console.log('totalPrice')
        console.log(totalPrice)

        console.log('totalItems')
        console.log(totalItems)

        setItemNumber(totalItems);
        setTotalPrice(totalPrice);

    }, [selectedProducts])

    return (
        <>

            {/* <!-- Navbar --> */}
            <nav className="flex justify-between py-4 px-4 bg-white/80 backdrop-blur-md shadow-md w-full fixed top-0 left-0 right-0 z-20 border-b-2 border-b-slate-300">

                {/* IZQUIERDA */}
                <div className="flex items-center">

                    {/* Logo */}
                    <Link href="/" className="px-3 py-2.5 ml-2 text-lg text-center rounded-2xl hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 cursor-pointer">
                        <h3 className="text-2xl font-medium text-blue-500">
                            {/* <Image
                                src='/assets/images/single-candy.png'
                                width={50}
                                height={50}
                                alt='loader'
                                className='object-contain'
                            /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: 'rgb(75, 85, 99)' }} height="1em" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" className="h-8 w-8" /></svg>
                        </h3>
                    </Link>

                    {/* Productos */}
                    {/* <Link
                        href="/productos"
                        type="button"
                        className="inline-flex justify-center items-center ml-2 text-white font-bold text-lg text-center bg-blue-600 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 rounded-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        <svg enable-background="new 0 0 64 64" width="24" id="Layer_1" version="1.1" viewBox="0 0 64 64" space="preserve" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"><path d="M63.7,20.776l-1.197-1.466c-0.065-0.023-0.133-0.068-0.215-0.157c-0.985-1.1-6.534-2.4-8.363-7.791  c-1.764-5.195-4.505-7.884-4.703-8.073c-1.143-0.669-1.904,1.047-2.156,1.738l-0.09,0.269l-0.002,0.006l-2.904,8.587  c-1.393,4.099-4.021,2.68-4.021,2.68l0.005,0.008c-5.933-2.629-13.248-1.812-18.796,2.73c-5.343,4.375-7.617,11.043-6.52,17.189  c0.007,0.055,0.007,0.097,0.015,0.156c0.362,2.828-1.1,3.504-1.837,3.664l-0.398,0.05h-0.002L2.183,41.692l-0.001,0.002  l-0.677,0.085c-0.909,0.182-2.249,0.741-0.843,2.46l0.561,0.685c0.361,0.434,1.832,2.045,4.274,2.871  c2.835,0.958,2.226,5.066,5,8.454l3.296,4.026c0,0,1.722,1.84,2.934-0.99l4.046-9.473c0.322-0.608,1.297-1.79,3.806-0.886  c0.049,0.018,0.082,0.024,0.127,0.039c5.882,2.477,13.048,1.62,18.504-2.848c5.814-4.76,7.992-12.23,6.147-18.794l0.017,0.001  c0,0-1.011-1.952,3.535-2.901l9.594-1.996C63.404,22.169,64.432,21.667,63.7,20.776z M20.474,42.34  c-4.828-5.896-3.96-14.637,1.807-19.96c-1.245,4.652-2.712,15.655,7.322,24.942C26.118,46.884,22.829,45.216,20.474,42.34z   M42.85,42.307c0.146-3.755-1.107-12.921-7.678-23.835c3.243,0.557,6.271,2.194,8.479,4.892  C48.185,28.896,47.696,36.938,42.85,42.307z" fill="#fff" /></svg>
                        <span className="ml-1 hidden md:block">Productos</span>
                    </Link> */}

                    {/* Escanear */}
                    {/* <Link
                        href="/escanear"
                        type="button"
                        className="inline-flex justify-center items-center px-5 py-2.5 ml-2 font-bold text-lg text-center text-gray-900 rounded-lg border border-gray-400 hover:bg-gray-400 focus:ring-4 focus:ring-gray-600"
                    >
                        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h4.01V2H2v6h2V4zm0 12H2v6h6.01v-2H4v-4zm16 4h-4v2h6v-6h-2v4zM16 4h4v4h2V2h-6v2z" /><path d="M5 11h6V5H5zm2-4h2v2H7zM5 19h6v-6H5zm2-4h2v2H7zM19 5h-6v6h6zm-2 4h-2V7h2zm-3.99 4h2v2h-2zm2 2h2v2h-2zm2 2h2v2h-2zm0-4h2v2h-2z" /></svg>
                        <span className="ml-1 hidden md:block"> Escanear</span>
                    </Link> */}

                </div>


                {/* DERECHA */}
                <div className="flex items-center space-x-5">

                    {/* Shopping cart */}
                    <Link
                        href="/carrito"
                        className="inline-flex justify-between items-center px-3 pr-4 py-2.5 ml-2 text-lg text-center text-gray-900 rounded-2xl hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 cursor-pointer"
                    >

                        <div className="relative">
                            {/* cart icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-8 w-8 text-gray-600">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>

                            {/* cart counter */}
                            <span className="absolute -top-2 left-4 rounded-full bg-red-500 p-0.5 px-2 text-sm text-red-50">
                                {itemNumber}
                            </span>
                        </div>

                        <span className="pl-2">
                            - <span className="text-gray-700">${totalPrice}</span>
                        </span>

                    </Link>

                </div>
            </nav>

        </>
    )
}

export default Nav