export const POST = async (request) => {
    const { all } = await request.json();

    try {
        const response = await fetch(`https://lagaleriadeldulce.ipos.shop/api/v1/orders?type=light`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(all),
        });

        if (response.ok) {
            return new Response("Pedido enviado", { status: 200 });
        } else {
            return new Response("No se pudo enviar el pedido", { status: 400 });
        }

    } catch (error) {
        console.log(error);
        return new Response(error.message, { status: 400 });
    }

    return new Response("Bad request", { status: 400 });
}