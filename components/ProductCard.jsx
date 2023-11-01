'use client'

import Image from "next/image"
import { useSelectedProductsContext } from "./SelectedProductsContext"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from 'react-toastify';

import { useState } from "react"

const ProductCard = ({ productInfo, stockInfo }) => {

    const router = useRouter();

    const [quantity, setQuantity] = useState(0)
    const { selectedProducts, setSelectedProducts } = useSelectedProductsContext();

    const handleAddProduct = () => {
        let productDetails = {
            id: productInfo.ID,
            brand: productInfo.Brand,
            description: productInfo.Description,
            name: productInfo.Name,
            price: productInfo.ProductVariations[0].FinalPrice,
            variationID: productInfo.ProductVariations[0].ID,
            quantityRemaining: stockInfo.Quantity,
            quantitySelected: quantity,
        }
        console.log('productDetails', productDetails)
        setSelectedProducts([...selectedProducts, productDetails])
        toast.success('Producto agregado exitosamente', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        router.push(`/carrito`);
    }

    function doesObjectExistWithId(idToFind) {
        return selectedProducts.some(obj => obj.id === idToFind);
    }

    return (
        <>

            <div className="w-80 bg-white shadow rounded-lg mb-4">

                {/* image */}
                <div
                    className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
                    style={{
                        backgroundImage: productInfo.Pictures.length > 0 ? productInfo.Pictures[0].PictureUrl : 'url("https://static.vecteezy.com/system/resources/previews/018/888/351/original/cartoon-candy-icon-png.png")',
                        backgroundPosition: "center"
                    }}
                >

                    {/* disponible */}
                    <div>
                        {stockInfo?.Quantity > 0 ?
                            <span
                                className="uppercase text-mlg bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none"
                            >
                                disponible: {stockInfo?.Quantity}
                            </span>
                            :
                            <span
                                className="uppercase text-mlg bg-red-50 p-0.5 border-red-500 border rounded text-red-700 font-medium select-none"
                            >
                                sin stock
                            </span>
                        }
                    </div>

                </div>

                <div className="p-4 flex flex-col items-center">

                    {/* marca */}
                    <p className="text-gray-800 font-light text-sm text-center bg-gray-200 px-3 rounded-lg">
                        {productInfo?.Brand}
                    </p>

                    <div className="py-2">

                        {/* nombre */}
                        <h1 className="text-gray-800 text-center mt-1 text-xl" style={{ fontWeight: 600 }}>
                            {productInfo?.Name}
                        </h1>

                        {/* descripcion */}
                        <p className="text-gray-600 font-light text-sm text-center">
                            {productInfo?.Description}
                        </p>

                    </div>

                    {/* precio */}
                    <p className="text-center mt-1 text-green-800 text-xl">
                        ${productInfo?.ProductVariations[0]?.FinalPrice} {productInfo?.Currency}
                    </p>

                    <div>
                        {doesObjectExistWithId(productInfo.ID) ?
                            <>
                                <hr className="my-2 mt-4" />
                                <div className="text-center justify-center">
                                    <span className="text-gray-500 italic">
                                        El producto ya se encuentra en tu carrito de compras.
                                    </span>

                                    {/* carrito */}
                                    <Link
                                        className="py-2 px-4 text-gray-900 rounded-lg border border-gray-400 hover:bg-gray-400 focus:ring-4 focus:ring-gray-600 w-full flex items-center justify-center mt-2"
                                        disabled={quantity === 0 || stockInfo?.Quantity === 0}
                                        href="/carrito"
                                    >
                                        Ir al carrito
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 ml-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </>
                            :
                            <div className="text-center justify-center">

                                {/* cantidad */}
                                <div className="inline-flex items-center mt-2">

                                    {/* minus button */}
                                    <button
                                        className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-4 py-2 border-r border-gray-200"
                                        onClick={() => setQuantity(quantity - 1)}
                                        disabled={quantity === 0}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M20 12H4"
                                            />
                                        </svg>
                                    </button>

                                    {/* cantidad */}
                                    <div
                                        className="bg-gray-100 text-2xl border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none"
                                    >
                                        {quantity}
                                    </div>

                                    {/* plus button */}
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        disabled={stockInfo?.Quantity === 0 || quantity === stockInfo?.Quantity}
                                        className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-4 py-2 border-r border-gray-200"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                {/* agregar */}
                                <button
                                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center"
                                    disabled={quantity === 0 || stockInfo?.Quantity === 0}
                                    onClick={() => {
                                        handleAddProduct()
                                    }}
                                >
                                    Agregar al carrito
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 ml-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </button>

                            </div>
                        }
                    </div>

                </div>
            </div>

        </>


    )
}

export default ProductCard