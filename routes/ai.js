const express = require("express");

const router = express.Router();

const requireAuth = require("../middleware/auth");
const aiController = require("../controllers/aiController");

router.get(
    "/",
    requireAuth,
    aiController.showAssistant
);

router.post(
    "/ask",
    requireAuth,
    aiController.ask
);

module.exports = router;