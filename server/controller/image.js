const Image = require("../Schema/image");
exports.uploadController = (req, res, next) => {
  const image = req.body.image;
  if (image) {
    const imageModel = new Image({ image: image });
    imageModel
      .save()
      .then((imageDetails) =>
        res.json({ msg: req.body.image, image: imageDetails })
      )
      .catch(() => res.json({ err: "Failed to save Image" }));
  }
};

exports.getImage = (req, res, next) => {
  const id = req.params.id;
  Image.findById(id)
    .then((image) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<img src=${image.image} alt="Required Profile" />`);
    })
    .catch((err) => res.json({ err: err }));
};
