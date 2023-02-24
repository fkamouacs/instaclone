const express = require("express");
const profileModel = require("../models/profile");
const router = express();
const ObjectId = require("mongodb").ObjectId;

// get a profile by handle
router.get("/:handle", async (request, response) => {
  profileModel.findOne(request.params, (err, profile) => {
    if (err) throw err;
    response.json(profile);
    console.log(profile);
  });
});

// get a profile by id
router.get("/profile/:id", async (req, res) => {
  profileModel.findOne({ _id: req.params.id }, (err, profile) => {
    if (err) throw err;
    res.json(profile);
  });
});

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

// upload profile pic
router.post("/upload/pfp", async (req, res) => {
  const id = req.body.id;

  // find current user
  profileModel.findOne({ _id: id }, async (err, profile) => {
    try {
      profile.pfp = req.body.url;
      await profile.save();
      res.json(profile.pfp);
    } catch (err) {
      console.error(err);
    }
  });
});

// follow a profile
router.post("/follow/id", async (req, res) => {
  const followingId = req.body.followingId;
  const followerId = req.body.followerId;

  //update follower following array
  profileModel.findOne({ _id: followerId }, async (err, profile) => {
    if (!profile.follows.includes(followingId)) {
      profile.follows.push(followingId);
      await profile.save();
    }
  });

  //update following  follow array
  profileModel.findOne({ _id: followingId }, async (err, profile) => {
    if (!profile.followers.includes(followerId)) {
      profile.followers.push(followerId);
      await profile.save();
      res.json(profile);
    }
  });
});

// unfollow a profile
router.post("/unfollow/id", async (req, res) => {
  const unfollowingId = req.body.unfollowingId;
  const unfollowerId = req.body.unfollowerId;

  //update unfollower following array
  profileModel.findOne({ _id: unfollowerId }, async (err, user) => {
    if (user.follows.length > 0) {
      const result = user.follows.filter((profile) => {
        profile._id == unfollowingId;
      });

      user.follows = result;

      await user.save();
    }
  });

  //update unfollowed follwoing array
  profileModel.findOne({ _id: unfollowingId }, async (err, user) => {
    const result = user.followers.filter(
      (profile) => profile._id == unfollowerId
    );

    user.followers = result;
    await user.save();
    res.json(user);
  });
});

router.post("/create/addPost_profile", async (req, res) => {
  // find user
  const userId = req.body.userId;
  const postId = req.body.postId;
  profileModel.findOne({ _id: userId }, async (err, user) => {
    // add post
    user.posts.push(postId);
    await user.save();
    res.json(user);
  });
});

module.exports = router;

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
