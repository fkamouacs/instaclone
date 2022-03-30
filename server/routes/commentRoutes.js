const express = require("express");
const commentModel = require("../models/comment");
const router = express();
const ObjectId = require("mongodb").ObjectId;

// get a comment by id
router.get("/p/:id", async (request, response) => {
  commentModel.findOne(request.params, (err, post) => {
    if (err) throw err;
    response.json(post);
  });
});

// post a comment
router.post("/add_post", async (request, response) => {
  const post = new commentModel(request.body);

  try {
    await post.save();
    response.send(post);
  } catch (e) {
    response.status(500).send(e);
  }
});

module.exports = router;
