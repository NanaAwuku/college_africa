const express = require("express");
const router = express.Router();
const {createApp, updateApp,deleteApp, listApps} = require('../controllers/appController')



router.post("/", createApp );
router.put("/:id", updateApp );
router.delete("/:id", deleteApp );
router.get("/", listApps );


module.exports = router;