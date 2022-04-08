const express = require("express");
const router = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const secret = process.env.JWT_SECRET;

router.get("/user/isUserAuth", async (req, res) => {
  const token = req.headers["x-access-token"].split(" ")[1];

  if (token != "null" && token) {
    const decode = jwt.verify(token, secret);
    res.json({
      isLoggedIn: true,
      data: decode,
    });
  } else {
    res.json({
      isLoggedIn: false,
      data: "error",
    });
  }
});

// create a user
router.post("/register", async (req, res) => {
  const user = req.body;
  const takenUsername = await User.findOne({ username: user.username });
  const takenEmail = await User.findOne({ email: user.email });

  if (takenUsername || takenEmail) {
    res
      .status(400)
      .json({ message: "Username or email has already been registered" });
  } else {
    user.password = await bcrypt.hash(req.body.password, 10);

    const dbUser = new User({
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password,
    });
    let id;
    dbUser.save((err, user) => {
      id = user.id;
    });
    res.status(200).json({ id: "!" });
  }
});

// check if valid email
router.post("/register/email", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "email already registered" });
    } else {
      return res.status(200).json({ msg: "email not registered" });
    }
  });
});

// log in a user
router.post("/login", (req, res) => {
  const userLoggingIn = req.body;
  User.findOne({ username: userLoggingIn.name }).then((dbUser) => {
    if (!dbUser) {
      return res.json({
        message: "Invalid username",
      });
    }
    bcrypt
      .compare(userLoggingIn.password, dbUser.password)
      .then((isCorrect) => {
        if (isCorrect) {
          const payload = {
            id: dbUser._id,
            username: dbUser.username,
          };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 86400 },
            (err, token) => {
              if (err) return res.json({ message: err });

              return res.status(200).json({
                message: "Success",
                token: "Bearer " + token,
              });
            }
          );
        } else {
          return res.status(400).json({
            message: "Invalid Email or password",
          });
        }
      });
  });
});

module.exports = router;
