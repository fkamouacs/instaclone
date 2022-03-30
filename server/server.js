const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./db/conn");

const profileRouter = require("./routes/profileRoutes");
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");
const port = 5000;

app.use(cors());
app.use(express.json());

app.options("*", cors());

app.use(profileRouter);
app.use(postRouter);
app.use(commentRouter);

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("db connected succesfully");
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});
