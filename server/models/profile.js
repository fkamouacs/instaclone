const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  _id: String,
  handle: String,
  name: String,
  pfp: String,
  bio: String,
  followers: [String],
  follows: [String],
  posts: [String],
  likes: [String],
  saved: [String],
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
