const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  handle: String,
  name: String,
  bio: String,
  followers: [String],
  follows: [String],
  posts: [String],
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
