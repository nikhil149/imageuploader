const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const imageRouter = require("./routes/imageRouter");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.use("/image",imageRouter)

mongoose.connect(process.env.DATABASE, {}).then(() => {
  console.log("DB Connected");
  app.listen(4000, () => console.log("Server is runninng on port 4000"));
});
