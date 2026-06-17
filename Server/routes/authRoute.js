const express = require("express");
const {getUser , signup , login , forgotUser , resetUser , checkOtp, sendSignupOtp, updateUser} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.post("/signup", signup);
router.post("/signup/send-otp", sendSignupOtp);
router.post("/login", login);
router.get("/user" , requireAuth, getUser);
router.put("/user", requireAuth, updateUser);
router.post("/forgotPassword",forgotUser);
router.post("/forgotPassword/otp",checkOtp);
router.post("/resetPassword", resetUser);

module.exports = router;
