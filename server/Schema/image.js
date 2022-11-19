import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

export const Image = mongoose.model("Image", imageSchema);
