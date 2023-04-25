const express = require("express");
const router = express.Router();
const {registerUser, loginUser, getMe} = require('../controllers/userController')



router.post("/", registerUser );
router.post("/login", loginUser );
router.get("/getMe", getMe );


module.exports = router;
