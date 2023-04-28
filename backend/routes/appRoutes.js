const express = require("express");
const router = express.Router();
const {createApp, updateApp} = require('../controllers/appController')



router.post("/", createApp );
router.put("/:id", updateApp );


module.exports = router;