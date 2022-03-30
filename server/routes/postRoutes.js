const express = require("express");
const postModel = require("../models/post");
const router = express();
const ObjectId = require("mongodb").ObjectId;

// get a post by id
router.get("/p/:id", async (request, response) => {
  postModel.findOne(request.params, (err, post) => {
    if (err) throw err;
    response.json(post);
  });
});

// post a post
router.post("/add_post", async (request, response) => {
  const post = new postModel(request.body);

  try {
    await post.save();
    response.send(post);
  } catch (e) {
    response.status(500).send(e);
  }
});

module.exports = router;
