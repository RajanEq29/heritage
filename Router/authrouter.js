// Register
const express = require("express");
const { register, verifyOTP } = require("../controller/TOP.Controller");

const router = express.Router();

router.post("/register",register);
router.post('/verify-otp',verifyOTP)

module.exports = router;
