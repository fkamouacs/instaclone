const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db/conn");

const profileRouter = require("./routes/profileRoutes");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const port = 5000;

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSucessStatus: 200,
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());

app.use(profileRouter);
app.use(postRouter);
app.use(userRouter);

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("db connected succesfully");
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});
