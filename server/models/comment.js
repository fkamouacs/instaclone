const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  post: Number,
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

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
