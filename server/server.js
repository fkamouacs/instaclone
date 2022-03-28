const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

const postRouter = require("./routes/postRoutes");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.options("*", cors());

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(postRouter);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("db connected succesfully");
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});
