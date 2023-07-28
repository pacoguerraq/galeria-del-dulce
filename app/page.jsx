import Link from "next/link";

export default async function Home() {

    return (
        <section className="flex justify-center items-center" style={{ height: '100vh' }}>

            <div className="px-4 mx-auto max-w-screen-xl text-center lg:px-12">

                {/* Titulo */}
                <h1 className="mb-4 text-5xl font-extrabold tracking-tight leading-none lg:text-8xl bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                    La Galería del Dulce
                </h1>

                {/* Descripción */}
                <p className="mb-8 text-xl font-normal text-gray-500 lg:text-2xl sm:px-16 xl:px-48 dark:text-gray-400">
                    Explora nuestra amplia selección de productos organizados en categorías y agrega tus favoritos al carrito. ¡Tu elección, tu pedido!
                </p>

                {/* Botones */}
                <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">

                    {/* Iniciar Pedido */}
                    <Link
                        href="/productos"
                        type="button"
                        className="inline-flex justify-center items-center text-white font-bold text-2xl text-center bg-blue-600 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Iniciar pedido
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </Link>

                </div>

            </div>
        </section>
    )
}
