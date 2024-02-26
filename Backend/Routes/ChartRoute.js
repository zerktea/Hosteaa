const express = require("express");
const router = express.Router();
const reviewPerBooking = require("../controllers/chartsControllers/reviewPerBooking");
const usersRoles = require("../controllers/chartsControllers/usersRolescontroller")
router.get("/api/reviewchart", reviewPerBooking);
router.get("/api/usersroles", usersRoles);

module.exports = router;