const productModel = require("../models/productModel");

async function home(req, res) {

    try {

        const products = await productModel.getAllProducts();

        res.render("home", {
            products,
            user: req.session.user || null
        });

    } catch (err) {

        console.error(err);

        res.status(500).send("Erro ao carregar produtos.");

    }

}

module.exports = {
    home
};