const express = require("express");
const UserModel = require("../models/user");
const router = express();
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// create a user
router.post("/register", (request, response) => {
  // Check if email is not registered
  UserModel.findOne({ email: request.body.email }).then((user) => {
    if (user) {
      return response
        .status(400)
        .json({ email: "A user has already regiestered with this email" });
    } else {
      const newUser = new UserModel({
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
      });

      newUser.save();
      return response.status(200).json({ msg: newUser });
    }
  });
});

// check if valid email
router.post("/register/email", (req, res) => {
  UserModel.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "email already registered" });
    } else {
      return res.status(200).json({ msg: "email not registered" });
    }
  });
});

// log in a user
router.get("/login", (req, res) => {
  const userLoggingIn = req.body;
  User.findOne({ username: userLoggingIn.username }).then((dbUser) => {
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
            id: db.User._id,
            username: dbUsername,
          };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 86400 },
            (err, token) => {
              if (err) return res.json({ message: err });
              return res.json({
                message: "Success",
                toekn: "Bearer" + token,
              });
            }
          );
        } else {
          return res.json({
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
