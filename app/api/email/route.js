import { transporter, mailOptions } from '@config/nodemailer.js';

const generateContent = (selectedProducts, name) => {

    const totalPrice = selectedProducts.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.price * currentObject.quantitySelected;
    }, 0);

    let html = `
        <h1>Nueva orden de ${name}</h1>
        <h2>Total: $${totalPrice}</h2>
        <ul>
    `;

    selectedProducts.forEach((product) => {
        html += `====================`;
        html += `<li style="font-weight: 700">${product.name}</li>`;
        html += `<li>Cantidad: ${product.quantitySelected}</li>`;
        html += `<li>Precio: ${product.price}</li>`;
        html += `<li>id: ${product.id}</li>`;
    });

    html += `====================`;
    html += `</ul>`;
    return html;

}

const generateText = (selectedProducts, name) => {

    const totalPrice = selectedProducts.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.price * currentObject.quantitySelected;
    }, 0);

    let text = `\nNueva orden de ${name}\n`;
    text += `Total: $${totalPrice}\n\n`;

    selectedProducts.forEach((product) => {
        text += `====================\n`;
        text += `Nombre: ${product.name}\n`;
        text += `Cantidad: ${product.quantitySelected}\n`;
        text += `Precio: ${product.price}\n`;
        text += `id: ${product.id}\n`;
    });

    text += `====================\n`;
    return text;

}

export const POST = async (request) => {
    const { selectedProducts, name } = await request.json();
    console.log('name', name);
    console.log('selectedProducts', selectedProducts);

    let generatedHtml = generateContent(selectedProducts, name);
    let generatedText = generateText(selectedProducts, name);

    try {
        await transporter.sendMail({
            ...mailOptions,
            subject: `Nueva orden de ${name}`,
            text: generatedText,
            html: generatedHtml,
        });

        return new Response("Email sent", { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response(error.message, { status: 400 });
    }

    return new Response("Bad request", { status: 400 });
}