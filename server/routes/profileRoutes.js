const express = require("express");
const profileModel = require("../models/profile");
const router = express();
const ObjectId = require("mongodb").ObjectId;

// get a profile by id
router.get("/profile/:handle", async (request, response) => {
  profileModel.findOne(request.params, (err, profile) => {
    if (err) throw err;
    response.json(profile);
  });
});

//update post

// post a profile
router.post("/add_profile", async (request, response) => {
  const profile = new profileModel(request.body);

  try {
    await profile.save();
    response.send(profile);
  } catch (e) {
    response.status(500).send(e);
  }
});

// router.get("/posts", async (request, response) => {
//   const posts = await postModel.find({});

//   try {
//     response.send(posts);
//   } catch (e) {
//     response.status(500).send(e);
//   }
// });

// router.post("/add_post", async (request, response) => {
//   const post = new postModel(request.body);

//   try {
//     await post.save();
//     response.send(post);
//   } catch (e) {
//     response.status(500).send(e);
//   }
// });

// router.get("/posts/:id", async (request, response) => {
//   let myquery = { _id: ObjectId(request.params) };
//   postModel.findOne(myquery, (err, post) => {
//     if (err) throw err;
//     response.json(post);
//   });
// });

// router.post("/posts/:id", async (request, response) => {
//   let myquery = { _id: ObjectId(request.params) };
//   let newvalue = {
//     likes: request.body.likes,
//   };
//   postModel.updateOne(myquery, newvalue, (err, result) => {
//     if (err) throw err;
//     response.json(result);
//   });
// });

module.exports = router;
