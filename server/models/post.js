const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  profile: Number,
  owner: String,
  likes: Number,
  desc: String,
  date: Date,
  comments: Number,
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
