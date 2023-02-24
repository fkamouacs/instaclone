const express = require("express");
const postModel = require("../models/post");
const router = express();
const ObjectId = require("mongodb").ObjectId;

// get a post by id
router.get("/p/:id", async (request, response) => {
  const id = request.params.id;
  postModel.findOne({ _id: ObjectId(id) }, function (err, post) {
    response.send(post);
  });
});

// post a post
router.post("/create/add_post", async (request, response) => {
  const newPost = new postModel(request.body);

  try {
    await newPost.save(function (err, post) {
      response.json({ id: post.id });
    });
  } catch (e) {
    response.status(500).send(e);
  }
});

// update a post
router.post("/p/:id", async (request, response) => {
  let myquery = { _id: ObjectId(request.params) };

  let newvalue;
  switch (request.body.type) {
    case "like":
      newvalue = {
        likes: request.body.post.likes,
      };
  }
  postModel.updateOne(myquery, newvalue, (err, result) => {
    if (err) throw err;
    response.json(result);
  });
});

module.exports = router;
