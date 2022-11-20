const Image = require("../Schema/image");
exports.uploadController = (req, res, next) => {
  const image = req.body.image;
  if (image) {
    const imageModel = new Image({ image: image });
    imageModel
      .save()
      .then((imageDetails) => res.json({ msg: req.body.image, image: imageDetails }))
      .catch(() => res.json({ err: "Failed to save Image" }));
  }
};
