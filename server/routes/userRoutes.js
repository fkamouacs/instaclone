const express = require("express");
const router = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.get("/user/isUserAuth", verifyJWT, async (req, res) => {
  console.log("XD");
  return res.json({ isLoggedIn: true, username: req.user.username });
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

    dbUser.save();
    res.json({ message: "success" });
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
                token: "Bearer" + token,
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

router.get("/getUsername", verifyJWT, (req, res) => {
  res.json({ isLoggedIn: true, username: req.user.username });
});

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"]?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res.json({
          isLoggedIn: false,
          message: "Failed to Authenticate",
        });
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      next();
    });
  } else {
    res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
}

module.exports = router;
