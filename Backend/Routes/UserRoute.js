const router = require("express").Router();
//const { default: Login } = require("../../Frontend/vite-project/src/routes/Login");
const multer = require('multer');
const saveUser= require('../controllers/userControllers/createUser');

const userLogin= require('../controllers/userControllers/userLogin');
const logedUser= require('../controllers/userControllers/logedUser');
const authenticateUser = require("../controllers/userControllers/authenticateUser");
const addProfilePicture = require("../controllers/userControllers/addProfilePicture");



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/profilepictures');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, 'profilePicture' + '-' + uniqueSuffix+'.'+file.mimetype.split('/')[1]);
    },
  });
const upload = multer({ storage: storage });
router.post('/api/newUser',saveUser.createUser)
router.post('/api/login',userLogin.userLogin)
router.post('/api/loginadmin',userLogin.loginadmin)
router.get("/api/getLogedUser", authenticateUser, logedUser.logedUser);
router.post('/api/upload', upload.single('profilePicture'),addProfilePicture);

module.exports= router;