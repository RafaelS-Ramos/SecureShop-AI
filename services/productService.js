const db = require("../database/db");
const productModel = require("../models/productModel");

async function listProducts() {
    return await productModel.getAllProducts();
}

async function getProductById(id) {
    return await productModel.getProductById(id);
}

async function createProduct(product) {
    return new Promise((resolve, reject) => {

        db.run(
            `INSERT INTO products
            (name, description, price, category, stock)
            VALUES (?, ?, ?, ?, ?)`,
            [
                product.name,
                product.description,
                product.price,
                product.category,
                product.stock
            ],
            function (err) {

                if (err) return reject(err);

                resolve(this.lastID);

            }

        );

    });
}

async function updateProduct(id, product) {
    return await productModel.updateProduct(id, product);
}

async function deleteProduct(id) {
    return await productModel.deleteProduct(id);
}

module.exports = {
    listProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
};