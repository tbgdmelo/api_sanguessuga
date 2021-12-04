const express = require("express");
const fileController = require("./app/controllers/file");
const router = express.Router();

router.get("/",fileController.index);

const multer = require('multer');
const upload = multer();
router.post("/", upload.single('documento'), fileController.index);

module.exports = router;