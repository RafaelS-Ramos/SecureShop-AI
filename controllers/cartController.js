const productModel = require("../models/productModel");

async function addToCart(req, res) {

    const id = Number(req.params.id);

    const product = await productModel.getProductById(id);

    if (!product) {
        return res.status(404).send("Produto não encontrado.");
    }

    if (!req.session.cart) {
        req.session.cart = [];
    }

    const item = req.session.cart.find(p => p.id === id);

    if (item) {
        item.quantity++;
    } else {
        req.session.cart.push({
            id,
            quantity: 1
        });
    }

    res.redirect("/");
}

async function viewCart(req, res) {

    if (!req.session.cart) {
        req.session.cart = [];
    }

    const products = [];

    let total = 0;

    for (const item of req.session.cart) {

        const product = await productModel.getProductById(item.id);

        if (product) {

            product.quantity = item.quantity;

            product.subtotal = product.price * item.quantity;

            total += product.subtotal;

            products.push(product);

        }

    }

    res.render("cart", {
        products,
        total
    });

}

function removeFromCart(req, res) {

    const id = Number(req.params.id);

    req.session.cart = req.session.cart.filter(
        p => p.id !== id
    );

    res.redirect("/cart");

}

function clearCart(req, res) {

    req.session.cart = [];

    res.redirect("/cart");

}

module.exports = {
    addToCart,
    viewCart,
    removeFromCart,
    clearCart
};