const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/auth");
const cartController = require("../controllers/cartController");

router.get("/", requireAuth, cartController.viewCart);

router.post("/add/:id", requireAuth, cartController.addToCart);

router.post("/remove/:id", requireAuth, cartController.removeFromCart);

router.post("/clear", requireAuth, cartController.clearCart);

module.exports = router;