const express = require("express");
const { register, verifyOTP } = require("../controller/TOP.Controller");
const { authMiddleware } = require("../Middleware/Jwt.middleware");
const visitController = require("../controller/Visit.controller");
const { register1, auth } = require("../controller/Admin.Controller");
const router = express.Router();

router.post("/register", register);

router.post('/verify-otp', verifyOTP);

// 🔒 Protected Routes
router.get("/pages-overview", visitController.getAllPageVisitsOverview);

router.post("/create", visitController.createVisit);

router.get("/", visitController.getAllVisits);

router.get("/:id", visitController.getSingleVisit);

router.post("/add-visit/:userId", visitController.addVisitToUser);

router.delete("/:id", visitController.deleteVisit);

// ==========================================admin====================================================

router.post("/registerAdmin", register1);

router.post('/login', auth);

module.exports = router;


