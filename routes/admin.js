const express = require("express");

const router = express.Router();

const requireAdmin = require("../middleware/admin");

const adminController = require("../controllers/adminController");

router.get(
    "/",
    requireAdmin,
    adminController.dashboard
);

router.get(
    "/products/new",
    requireAdmin,
    adminController.newProductForm
);

router.post(
    "/products",
    requireAdmin,
    adminController.createProduct
);

router.get(
    "/products",
    requireAdmin,
    adminController.listProducts
);

router.get(
    "/products/:id/edit",
    requireAdmin,
    adminController.editProductForm
);

router.post(
    "/products/:id",
    requireAdmin,
    adminController.updateProduct
);

router.post(
    "/products/:id/delete",
    requireAdmin,
    adminController.deleteProduct
);

module.exports = router;