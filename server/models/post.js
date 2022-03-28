const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  op: String,
  likes: Number,
  desc: String,
  comments: [
    {
      owner: String,
      comment: String,
    },
  ],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
