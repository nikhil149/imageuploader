const { uploadController } = require("../controller/image");

const router = require("express").Router();


router.post("/upload", uploadController)

module.exports = router;