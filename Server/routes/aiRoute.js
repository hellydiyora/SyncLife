const express = require("express");
const router = express.Router();
const { getInsights } = require("../controllers/aiController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.post("/insights", getInsights);

module.exports = router;
