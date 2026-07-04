const db = require("../database/db");

function getAllProducts() {
    return new Promise((resolve, reject) => {
        db.all(
            "SELECT * FROM products ORDER BY id",
            [],
            (err, rows) => {
                if (err) {
                    return reject(err);
                }

                resolve(rows);
            }
        );
    });
}

function getProductById(id) {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT * FROM products WHERE id = ?",
            [id],
            (err, row) => {
                if (err) {
                    return reject(err);
                }

                resolve(row);
            }
        );
    });
}

function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        db.run(
            "DELETE FROM products WHERE id = ?",
            [id],
            function (err) {
                if (err) {
                    return reject(err);
                }

                resolve(this.changes);
            }
        );
    });
}

function updateProduct(id, product) {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE products
             SET
                name = ?,
                description = ?,
                price = ?,
                category = ?,
                stock = ?
             WHERE id = ?`,
            [
                product.name,
                product.description,
                product.price,
                product.category,
                product.stock,
                id
            ],
            function (err) {
                if (err) {
                    return reject(err);
                }

                resolve(this.changes);
            }
        );
    });
}

module.exports = {
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct
};