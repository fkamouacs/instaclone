const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  _id: String,
  owner: String,
  likes: Number,
  desc: String,
  date: Date,
  comments: [
    {
      owner: String,
      comment: String,
      likes: Number,
      replies: [
        {
          owner: String,
          comment: String,
          likes: Number,
          date: Date,
        },
      ],
      date: Date,
    },
  ],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
