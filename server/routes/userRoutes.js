const express = require("express");
const UserModel = require("../models/user");
const router = express();
const ObjectId = require("mongodb").ObjectId;

// create a user
router.post("/register", (request, response) => {
  //Check if email is not registered
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
module.exports = router;
