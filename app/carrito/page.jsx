'use client'

import { useSelectedProductsContext } from "@components/SelectedProductsContext"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import { toast, ToastContainer } from 'react-toastify';
import CartProduct from "@components/CartProduct"

const Carrito = () => {

    const router = useRouter();

    const { selectedProducts, setSelectedProducts } = useSelectedProductsContext();

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {

        // Calculate the total sum of (price * quantitySelected) using reduce
        const totalPrice = selectedProducts.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.price * currentObject.quantitySelected;
        }, 0);

        setTotalPrice(totalPrice);

    }, [selectedProducts])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openSendOrder, setOpenSendOrder] = useState(false);
    const handleOpenSendOrder = () => setOpenSendOrder(true);
    const handleCloseSendOrder = () => setOpenSendOrder(false);

    const [nombre, setNombre] = useState('');
    const [searching, setSearching] = useState(false);

    const handleEmptyCart = () => {
        console.log('Vaciar carrito')
        setSelectedProducts([]);
        handleClose();
        toast.success('Carrito vaciado exitosamente', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const finalizarPedido = async () => {
        console.log('Finalizar pedido')
        setSearching(true);
        const newArray = selectedProducts.map(item => {
            return {
                "ProductID": item.id.toString(),
                "VariationID": item.variationID.toString(),
                "Quantity": item.quantitySelected,
                "DiscountPercentage": 0.0,
                "Notes": null
            };
        });
        console.log('newArray', newArray)

        try {
            const response = await fetch(`/api/sendOrder`, {
                method: "POST",
                body: JSON.stringify({
                    all: {
                        "ClientID": "30", // specific client created for website
                        "Delivery": 0.0,
                        "DeliveryTax": 0.0,
                        "DiscountPercentage": 0.0,
                        "Payments": [],
                        "LocationID": "1",
                        "SalesChannelID": null,
                        "Notes": "Probando",
                        "OrderDetails": newArray,
                        "User": "5531" // admin user id
                    }
                }),
            });

            if (response.ok) {
                // router.push("/");
                setSelectedProducts([]);
                handleCloseSendOrder();
                setSearching(false);
                toast.success('Tu pedido fue enviado con éxito', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                console.log('response', response)
                console.log('Pedido enviado a iPos')

                // PARA CORREO
                try {
                    const responseEmail = await fetch(`/api/email`, {
                        method: "POST",
                        body: JSON.stringify({
                            selectedProducts: selectedProducts,
                            name: nombre,
                        }),
                    });

                    if (responseEmail.ok) {
                        // router.push("/");
                        setSelectedProducts([]);
                        handleCloseSendOrder();
                        setSearching(false);
                        console.log('correo enviado')
                    }

                } catch (error) {
                    console.log('error', error);
                    console.log('Error al enviar correo')
                    handleCloseSendOrder();
                    setSearching(false);
                }
            }

        } catch (error) {
            console.log('error', error);
            console.log('Error al enviar pedido a iPos')
            handleCloseSendOrder();
            setSearching(false);
            toast.error('Hubo un error al enviar tu pedido', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return (
        <>
            <section
                className="flex justify-center flex-col text-center"
                style={{
                    height: selectedProducts.length > 0 ? 'auto' : '100vh',
                    alignItems: selectedProducts.length > 0 ? 'top' : 'center',
                    paddingTop: selectedProducts.length > 0 ? '120px' : '0px',
                }}>

                <div className="px-4 mx-auto max-w-screen-xl text-center lg:px-12">

                    <div className="mb-4">
                        {selectedProducts.length > 0 ?
                            <>

                                <h1 className="mb-6 text-5xl font-extrabold tracking-tight leading-none">
                                    Carrito de compras
                                </h1>

                                {/* Botones */}
                                <div className="flex flex-col mb-8 lg:mb-16 space-y-2 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">

                                    {/* Finalizar pedido */}
                                    <button
                                        onClick={() => { handleOpenSendOrder() }}
                                        type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    >
                                        Finalizar pedido
                                    </button>

                                    {/* Vaciar carrito */}
                                    <button
                                        onClick={() => { handleOpen() }}
                                        type="button"
                                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                    >
                                        Vaciar carrito
                                    </button>

                                    {/* Seguir comprando */}
                                    <Link
                                        href="/productos"
                                        type="button"
                                        className="inline-flex justify-center items-center text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 text-center"
                                    >
                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>

                                        Seguir comprando
                                    </Link>



                                </div>

                                {/* Total price */}
                                <h2 className="text-green-800 text-2xl font-bold mb-2">
                                    Total: ${totalPrice}
                                </h2>

                                {/* Lista de Productos */}
                                <div className="mb-6">
                                    {selectedProducts.map((product) => (
                                        <CartProduct key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* Modal - Send Order */}
                                <Dialog
                                    open={openSendOrder}
                                    onClose={handleCloseSendOrder}
                                >
                                    <DialogTitle style={{ borderBottom: '1px solid gray' }}>
                                        <h1 className="font-bold">
                                            Finalizar pedido
                                        </h1>
                                    </DialogTitle>

                                    <DialogContent style={{ paddingTop: '15px' }}>
                                        <p className="mb-4">
                                            Para finalizar el pedido, ingrese su nombre.
                                        </p>
                                        <input
                                            type="text"
                                            className="block w-full p-4 pl-4 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                            placeholder="Nombre"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            required
                                        />
                                    </DialogContent>

                                    <DialogActions style={{ padding: '20px', paddingTop: 0 }}>

                                        {/* cancelar */}
                                        <button
                                            type="button"
                                            onClick={handleCloseSendOrder}
                                            className="justify-center items-center text-gray-800 text-lg text-center rounded-lg p-3 border font-bold border-gray-600 hover:bg-gray-100 focus:ring-1 focus:ring-gray-900"
                                        >
                                            Cancelar
                                        </button>

                                        {/* enviar */}
                                        <button
                                            type="button"
                                            disabled={nombre === '' || searching}
                                            onClick={finalizarPedido}
                                            className="justify-center items-center text-lg text-white text-center rounded-lg p-3 font-bold bg-green-700 hover:bg-green-600 focus:ring-1 focus:ring-green-900"
                                        >
                                            {searching ?
                                                <>
                                                    <svg aria-hidden="true" role="status" className="inline w-6 h-6 mb-1 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                    </svg>
                                                </>
                                                :
                                                <>
                                                    Enviar
                                                </>
                                            }
                                        </button>

                                    </DialogActions>

                                </Dialog>

                                {/* Modal - Empty Cart */}
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <DialogTitle>
                                        <h1 className="font-bold">
                                            ¿Estás seguro que quieres vaciar el carrito?
                                        </h1>
                                    </DialogTitle>
                                    {/* <DialogContent>
                                            <DialogContentText>
                                                Let Google help apps determine location. This means sending anonymous
                                                location data to Google, even when no apps are running.
                                            </DialogContentText>
                                        </DialogContent> */}
                                    <DialogActions style={{ padding: '20px', paddingTop: 0 }}>
                                        <button
                                            type="button"
                                            onClick={handleClose}
                                            className="justify-center items-center text-gray-800 text-lg text-center rounded-lg p-2 border border-gray-600 hover:bg-gray-100 focus:ring-1 focus:ring-gray-900"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleEmptyCart}
                                            className="justify-center items-center text-red-800 text-lg text-center rounded-lg p-2 border border-red-800 hover:bg-red-100 focus:ring-1 focus:ring-red-900">
                                            Vaciar
                                        </button>
                                    </DialogActions>
                                </Dialog>
                            </>
                            :
                            <>
                                {/* Empty Cart */}
                                <div className="px-4 mx-auto max-w-screen-xl text-center lg:px-12">
                                    <h1 className="mb-4 text-5xl font-extrabold tracking-tight leading-none">
                                        Carrito de compras vacío
                                    </h1>

                                    <p className="mb-8 text-xl font-normal text-gray-500 lg:text-2xl sm:px-16 xl:px-48 dark:text-gray-400">
                                        Aun no haz agregado productos al carrito
                                    </p>

                                    {/* Regresar */}
                                    <Link
                                        href="/productos"
                                        type="button"
                                        className="inline-flex justify-center items-center text-gray-900 font-bold text-2xl text-center rounded-lg p-4 border border-gray-400 hover:bg-gray-400 focus:ring-4 focus:ring-gray-600"
                                    >
                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                                        Comenzar orden
                                    </Link>
                                </div>
                            </>
                        }
                    </div>

                </div>
                <ToastContainer />
            </section>
        </>
    )
}

export default Carrito