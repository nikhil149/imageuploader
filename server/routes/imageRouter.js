const { uploadController, getImage } = require("../controller/image");

const router = require("express").Router();


router.post("/upload", uploadController);
router.get("/details/:id", getImage)

module.exports = router;