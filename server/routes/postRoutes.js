const express = require("express");
const postModel = require("../models/post");
const router = express();

router.get("/posts", async (request, response) => {
  const posts = await postModel.find({});

  try {
    response.send(posts);
  } catch (e) {
    response.status(500).send(e);
  }
});

router.post("/add_post", async (request, response) => {
  const post = new postModel(request.body);

  try {
    await post.save();
    response.send(post);
  } catch (e) {
    response.status(500).send(e);
  }
});

router.get("/post/:_id", async (request, response) => {
  response.send(request.params);
});

module.exports = router;
