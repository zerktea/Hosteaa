const express = require("express");
const router = express.Router();
const houseController = require("../controllers/houseControllers/createHouse.js");
const getOwnersHouse = require("../controllers/houseControllers/getHousesByOwner");
const getAllHouses = require("../controllers/houseControllers/getAllHouses");
const getHouseById = require("../controllers/houseControllers/getHouseById"); 
const editHouse = require("../controllers/houseControllers/editHouse");


const authenticateUser = require("../controllers/userControllers/authenticateUser");


const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/accommodationpictures')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.'+file.mimetype.split('/')[1])
    },
  });// Use memory storage for storing files as buffers


router.get("/api/allhouses", getAllHouses.getAllHouses);
router.get("/api/ownerhouses", getOwnersHouse.getHousesByOwner);

const upload = multer({ storage });
router.post(
  "/api/createhouses",
  upload.array("pictures", 10), // Specify the field name and the maximum number of files
  houseController.createHouse
);

router.get("/api/house/:id", getHouseById.getHouseById);
router.put("/api/edithouse/:id", editHouse.editHouse);
router.put("/api/disableHouses/:id",  editHouse.disableHouse);
module.exports = router;


