const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const imageRouter = require("./routes/imageRouter");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/image", imageRouter);

mongoose.connect(process.env.DATABASE, {}).then(() => {
  console.log("DB Connected");
  app.listen(4000, () => console.log("Server is runninng on port 4000"));
});
