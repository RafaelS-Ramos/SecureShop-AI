const db = require("../database/db");
const productService = require("../services/productService");

function dashboard(req, res) {
    db.get(
        "SELECT COUNT(*) AS total FROM products",
        [],
        (err, productResult) => {

            if (err) {
                return res.status(500).send("Erro ao carregar dashboard.");
            }

            db.get(
                "SELECT COUNT(*) AS total FROM users",
                [],
                (err, userResult) => {

                    if (err) {
                        return res.status(500).send("Erro ao carregar dashboard.");
                    }

                    res.render("admin-dashboard", {
                        user: req.session.user,
                        totalProducts: productResult.total,
                        totalUsers: userResult.total
                    });

                }
            );

        }
    );
}

function newProductForm(req, res) {
    res.render("product-form");
}

async function createProduct(req, res) {
    try {
        await productService.createProduct(req.body);

        res.redirect("/admin/products");
    } catch (error) {
        console.error(error);

        res.status(500).send("Erro ao cadastrar produto.");
    }
}

async function listProducts(req, res) {
    try {
        const products = await productService.listProducts();

        res.render("admin-products", {
            user: req.session.user,
            products
        });
    } catch (error) {
        console.error(error);

        res.status(500).send("Erro ao carregar os produtos.");
    }
}

async function editProductForm(req, res) {

    const product = await productService.getProductById(req.params.id);

    res.render("product-edit", {
        product
    });

}

async function updateProduct(req, res) {

    await productService.updateProduct(
        req.params.id,
        req.body
    );

    res.redirect("/admin/products");

}

async function deleteProduct(req, res) {
    try {
        await productService.deleteProduct(req.params.id);

        res.redirect("/admin/products");
    } catch (error) {
        console.error(error);

        res.status(500).send("Erro ao excluir o produto.");
    }
}

module.exports = {
    dashboard,
    newProductForm,
    createProduct,
    listProducts,
    editProductForm,
    updateProduct,
    deleteProduct
};