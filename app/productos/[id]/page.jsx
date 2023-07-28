import ProductCard from "@components/ProductCard";
import Link from "next/link";

const getProductById = async (productId) => {
    const data = await fetch(`https://lagaleriadeldulce.ipos.shop/api/v1/products/${productId}`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`,
            },
            // to avoid cache, new fetch on every request (although it takes more time)
            cache: 'no-store'
        });

    return data.json();
};

const getStockById = async (productId, variationId) => {
    const data = await fetch(`https://lagaleriadeldulce.ipos.shop/api/v1/stock/check`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ProductID: productId,
                VariationID: variationId,
                LocationID: "1",
                SalesChannelID: "",
            }),
            // to avoid cache, new fetch on every request (although it takes more time)
            cache: 'no-store'
        });

    return data.json();
};

export default async function SingleProduct({ params }) {

    // fetch function
    const productInfo = await getProductById(params.id)
    console.log('====================================');
    console.log('productInfo');
    console.log(productInfo)
    let stockInfo = {}
    if (productInfo?.Data?.Name && productInfo?.Data?.ProductVariations.length > 0) {
        console.log(productInfo?.Data?.ProductVariations[0])
        stockInfo = await getStockById(params.id, productInfo.Data.ProductVariations[0].ID)
        console.log('====================================');
        console.log('stockInfo');
        console.log(stockInfo)
    }

    console.log('params', params)

    return (
        <div
            className="flex flex-col justify-center items-center"
            style={{
                height: productInfo?.Data?.Name ? 'auto' : '100vh',
                paddingTop: productInfo?.Data?.Name ? '100px' : '0px',
            }}
        >
            {productInfo?.Data?.Name ?
                <>
                    {/* Regresar */}
                    <Link
                        href="/productos"
                        type="button"
                        className="inline-flex justify-center items-center text-gray-900 font-bold text-xl text-center rounded-lg p-2 mb-4 border border-gray-400 hover:bg-gray-400 focus:ring-4 focus:ring-gray-600"
                    >
                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                        Seguir buscando
                    </Link>

                    {/* Product found */}
                    <ProductCard productInfo={productInfo?.Data} stockInfo={stockInfo?.Data} />
                </>
                :
                <>
                    {/* No ID found */}
                    <div className="px-4 mx-auto max-w-screen-xl text-center lg:px-12">
                        <h1 className="mb-4 text-5xl font-extrabold tracking-tight leading-none">
                            {productInfo?.Data?.ErrorMessage}
                        </h1>

                        <p className="mb-8 text-xl font-normal text-gray-500 lg:text-2xl sm:px-16 xl:px-48 dark:text-gray-400">
                            {productInfo?.Data?.Detail}
                        </p>

                        {/* Regresar */}
                        <Link
                            href="/productos"
                            type="button"
                            className="inline-flex justify-center items-center text-gray-900 font-bold text-2xl text-center rounded-lg p-4 border border-gray-400 hover:bg-gray-400 focus:ring-4 focus:ring-gray-600"
                        >
                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>                        Regresar
                        </Link>
                    </div>
                </>
            }
        </div>
    )
}
