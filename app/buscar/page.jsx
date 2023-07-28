'use client'

import { useState } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link";

const Buscar = () => {

    const router = useRouter();

    const [id, setId] = useState('')
    const [searching, setSearching] = useState(false)

    const handleSearch = (productId) => {
        router.push(`/productos/${productId}`);
    };

    return (
        <div className="flex justify-center items-center flex-col" style={{ height: '100vh' }}>

            {/* Regresar */}
            <Link
                href="/productos"
                type="button"
                className="inline-flex justify-center items-center text-gray-900 font-bold text-xl text-center rounded-lg p-2 mb-8 border border-gray-400 hover:bg-gray-400 focus:ring-4 focus:ring-gray-600"
            >
                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                Regresar
            </Link>

            {/* Descripción */}
            <p className="mb-4 text-xl font-normal text-center text-gray-500 lg:text-2xl sm:px-16 xl:px-48 dark:text-gray-400">
                Escribe el ID del producto que deseas buscar
            </p>

            <form className="flex">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="number"
                        className="block w-full p-4 pl-10 text-2xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                        style={{ width: '80vw' }}
                    />
                    <button
                        type="submit"
                        disabled={searching}
                        className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl px-4 py-2"
                        onClick={(e) => {
                            e.preventDefault()
                            setSearching(true)
                            console.log(id)
                            handleSearch(id)
                        }}
                    >
                        {searching ?
                            <>
                                <svg aria-hidden="true" role="status" class="inline w-6 h-6 mb-1 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                            </>
                            :
                            <>
                                Buscar
                            </>
                        }
                    </button>
                </div>
            </form>

        </div>
    )
}

export default Buscar