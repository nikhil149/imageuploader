const Image = require("../Schema/image");
exports.uploadController = (req, res, next) => {
  const image = req.body.image;
  if (image) {
    const imageModel = new Image({ image: image });
    imageModel
      .save()
      .then(() => res.json({ msg: req.body.image }))
      .catch(() => res.json({ err: "Failed to save Image" }));
  }
};
