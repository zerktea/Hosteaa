const router = require("express").Router();

const reviewsPerHouse = require("../controllers/reviewControllers/reviewsPerHouse");
const newReview = require("../controllers/reviewControllers/addReview");
const getReviewsPerUser = require("../controllers/reviewControllers/getReviewsPerUser");

router.post("/api/newreview", newReview);
router.get("/api/reviews/:houseId", reviewsPerHouse);
router.get("/api/userreviews/:userId", getReviewsPerUser);
module.exports= router;