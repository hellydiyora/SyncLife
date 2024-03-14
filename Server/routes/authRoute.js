const express = require("express");
const {getUser , signup , login} = require("../controllers/userController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user" , getUser);

module.exports = router;
