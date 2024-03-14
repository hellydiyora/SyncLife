const express = require("express");
const router = express.Router();
const { fetchGratitude, createGratitude } = require("../controllers/gratiController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/" ,fetchGratitude);
router.post("/" , createGratitude);


module.exports = router;