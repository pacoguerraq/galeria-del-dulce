import Link from "next/link";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default async function Productos() {

    return (
        <section className="flex justify-center items-center" style={{ height: '100vh' }}>

            <div className="px-4 mx-auto max-w-screen-xl text-center lg:px-12">

                {/* Titulo */}
                {/* <h1 className="mb-4 text-5xl font-extrabold tracking-tight leading-none lg:text-8xl bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                    La Galería del Dulce
                </h1> */}

                {/* Descripción */}
                {/* <p className="mb-8 text-xl font-normal text-gray-500 lg:text-2xl sm:px-16 xl:px-48 dark:text-gray-400">
                    Explora nuestra amplia selección de productos organizados en categorías y agrega tus favoritos al carrito. ¡Tu elección, tu pedido!
                </p> */}

                {/* Botones */}
                <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">

                    {/* Iniciar Pedido */}
                    <Link
                        href="/buscar"
                        type="button"
                        className="inline-flex justify-center items-center text-white text-4xl text-center rounded-lg p-6 bg-blue-600 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: 'white' }} height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                        <span className="ml-2"> Buscar</span>
                    </Link>

                    <Link
                        href="/escanear"
                        type="button"
                        className="inline-flex justify-center items-center text-gray-900 text-4xl text-center rounded-lg p-6 border-2 border-gray-400 hover:bg-gray-400 focus:ring-4 focus:ring-gray-600"
                    >
                        <svg height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h4.01V2H2v6h2V4zm0 12H2v6h6.01v-2H4v-4zm16 4h-4v2h6v-6h-2v4zM16 4h4v4h2V2h-6v2z" /><path d="M5 11h6V5H5zm2-4h2v2H7zM5 19h6v-6H5zm2-4h2v2H7zM19 5h-6v6h6zm-2 4h-2V7h2zm-3.99 4h2v2h-2zm2 2h2v2h-2zm2 2h2v2h-2zm0-4h2v2h-2z" /></svg>
                        <span className="ml-2"> Escanear</span>
                    </Link>

                </div>

            </div>

        </section>
    )
}