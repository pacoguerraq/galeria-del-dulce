'use client'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useSelectedProductsContext } from './SelectedProductsContext';

import { useState } from 'react';

const CartProduct = ({ product }) => {

    console.log(product)
    const { selectedProducts, setSelectedProducts } = useSelectedProductsContext();

    const [quantity, setQuantity] = useState(product.quantitySelected);
    const [openEdit, setOpenEdit] = useState(false);

    const handleOpenEdit = () => setOpenEdit(true);

    const handleCloseEdit = () => {
        setOpenEdit(false);
    }

    const [openDelete, setOpenDelete] = useState(false);

    const handleOpenDelete = () => setOpenDelete(true);

    const handleCloseDelete = () => {
        setOpenDelete(false);
    }

    const handleEditProduct = () => {
        // delete the product with old quantity
        const newArray = selectedProducts.filter(item => item.id !== product.id);
        // add same product with new quantity
        newArray.push({ ...product, quantitySelected: quantity });
        // set new array to products
        setSelectedProducts(newArray);
        // close modal
        handleCloseEdit();
    }

    const handleDeleteProduct = () => {
        // delete the product from array
        const newArray = selectedProducts.filter(item => item.id !== product.id);
        // set new array to products
        setSelectedProducts(newArray);
        // close modal
        handleCloseDelete();
    }

    return (
        <>

            <div className="bg-white shadow-md rounded-lg p-4 mb-2" style={{ width: '85vw', maxWidth: '500px' }}>
                {/* Product Name */}
                <h2 className="text-lg font-bold mb-2">{product.name}</h2>

                {/* Price, Quantity, Edit and Delete Buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-row">
                        {/* Price */}
                        <p className="text-md text-green-700 font-semibold">${product.price}</p>
                        {/* Quantity */}
                        <p className="text-md text-gray-500 ml-2">Cant: {product.quantitySelected}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        {/* Edit Button (Icon) */}
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded" onClick={handleOpenEdit}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: 'white' }} height="1em" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" /></svg>
                        </button>
                        {/* Delete Button (Icon) */}
                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded" onClick={handleOpenDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: 'white' }} height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Edit Product */}
            <Dialog
                open={openEdit}
                onClose={handleCloseEdit}
            >

                <DialogTitle style={{ borderBottom: '1px solid gray' }}>
                    <h1 className="font-bold">
                        Editar producto
                    </h1>
                </DialogTitle>

                <DialogContent style={{ paddingTop: '15px' }}>
                    <span
                        className="uppercase text-mlg bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none"
                    >
                        Disponibles: {product.quantityRemaining}
                    </span>
                    <p className='font-bold'>{product.name}</p>
                    <p className='text-green-800'>${product.price}</p>

                    <div className="text-center justify-center">

                        {/* cantidad */}
                        <div className="inline-flex items-center mt-2">

                            {/* minus button */}
                            <button
                                className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-4 py-2 border-r border-gray-200"
                                onClick={() => setQuantity(quantity - 1)}
                                disabled={quantity === 1}
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
                                disabled={quantity === product.quantityRemaining}
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

                    </div>
                </DialogContent>

                <DialogActions style={{ padding: '20px', paddingTop: 0 }}>

                    {/* cancelar */}
                    <button
                        type="button"
                        onClick={() => {
                            handleCloseEdit()
                            setQuantity(product.quantitySelected)
                        }}
                        className="justify-center items-center text-gray-800 text-lg text-center rounded-lg p-2 border border-gray-600 hover:bg-gray-100 focus:ring-1 focus:ring-gray-900"
                    >
                        Cancelar
                    </button>

                    {/* confirmar */}
                    <button
                        type="button"
                        onClick={handleEditProduct}
                        className="justify-center items-center text-green-700 text-lg text-center rounded-lg p-2 border border-green-700 hover:bg-green-100 focus:ring-1 focus:ring-green-900">
                        Confirmar
                    </button>
                </DialogActions>

            </Dialog>

            {/* Modal Delete Product */}
            <Dialog
                open={openDelete}
                onClose={setOpenDelete}
            >

                <DialogTitle style={{ borderBottom: '1px solid gray' }}>
                    <h1 className="font-bold">
                        Quitar producto
                    </h1>
                </DialogTitle>

                <DialogContent style={{ paddingTop: '15px' }}>
                    <p>
                        ¿Estás seguro que quieres quitar el producto <span className='font-bold'>"{product.name}"</span> del carrito?
                    </p>
                </DialogContent>

                <DialogActions style={{ padding: '20px', paddingTop: 0 }}>

                    {/* cancelar */}
                    <button
                        type="button"
                        onClick={() => {
                            setOpenDelete()
                        }}
                        className="justify-center items-center text-gray-800 text-lg text-center rounded-lg p-2 border border-gray-600 hover:bg-gray-100 focus:ring-1 focus:ring-gray-900"
                    >
                        Cancelar
                    </button>

                    {/* confirmar */}
                    <button
                        type="button"
                        onClick={handleDeleteProduct}
                        className="justify-center items-center text-red-700 text-lg text-center rounded-lg p-2 border border-red-700 hover:bg-red-100 focus:ring-1 focus:ring-green-900">
                        Confirmar
                    </button>
                </DialogActions>

            </Dialog>

        </>
    )
}

export default CartProduct