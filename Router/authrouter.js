// Register
const express = require("express");
const { register, verifyOTP } = require("../controller/TOP.Controller");
const { getSingleVisit, addVisitToUser } = require("../controller/Visit.controller");
const { authMiddleware } = require("../Middleware/Jwt.middleware");
const visitController = require("../controller/Visit.controller");
const router = express.Router();

router.post("/register",register);
router.post('/verify-otp',verifyOTP)


// 🔒 Protected Routes
router.post("/create",  visitController.createVisit);
router.get("/", visitController.getAllVisits);
router.get("/:id", visitController.getSingleVisit);
router.post("/add-visit/:userId", visitController.addVisitToUser);
router.delete("/:id", visitController.deleteVisit);

module.exports = router;

module.exports = router;
module.exports = router;
