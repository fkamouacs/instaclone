import React, { useState, useEffect } from "react";

import Post from "./profile/post";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({
    _id: "",
    follows: [],
    posts: [],
  });
  const [isEmpty, setIsEmpty] = useState();
  const [sortedFeed, setSortedFeed] = useState([]);
  useEffect(() => {
    // Get user

    const fetchUser = async () => {
      fetch("http://localhost:5000/user/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then(async (res) => await res.json())
        .then((data) => {
          setUser(data.data);
        });
    };
    fetchUser();

    return;
  }, []);

  useEffect(() => {
    const fetchProfile = async (username) => {
      await fetch(`http://localhost:5000/${username}`)
        .then(async (res) => await res.json())
        .then((data) => {
          setProfile(data);
        });
    };

    fetchProfile(user.username);

    return;
  }, [user]);

  useEffect(() => {
    setIsEmpty(false);
    if (profile != null && (profile.follows.length || profile.posts.length)) {
      if (!feed.length) {
        for (let followId in profile.follows) {
          // fetch follower profile
          let followProfile = { post: "" };
          async function fetchPosts() {
            await fetch(
              `http://localhost:5000/profile/${profile.follows[followId]}`
            )
              .then((res) => res.json())
              .then((data) => (followProfile = data));

            // fetch follower posts
            for (let postId in followProfile.posts) {
              await fetch(
                `http://localhost:5000/p/${followProfile.posts[
                  postId
                ].toString()}`
              )
                .then((res) => res.json())
                .then((data) =>
                  setFeed((feed) => [
                    ...feed,
                    { post: data, owner: followProfile },
                  ])
                );
            }
          }

          fetchPosts();
        }

        // fetch own posts
        const fetchOwn = async () => {
          for (let post in profile.posts) {
            await fetch(`http://localhost:5000/p/${profile.posts[post]}`)
              .then((res) => res.json())
              .then((data) =>
                setFeed((feed) => [...feed, { post: data, owner: profile }])
              );
          }
        };
        fetchOwn();
      }
    } else {
      setIsEmpty(true);
    }
  }, [profile]);

  useEffect(() => {
    // sort feed by time

    feed.sort((a, b) => {
      let temp1 = new Date(a.post.date);
      let temp2 = new Date(b.post.date);

      return temp2 - temp1;
    });

    setSortedFeed(feed);
  }, [feed]);

  const displayFeed = () => {
    if (sortedFeed.length == feed.length) {
      return sortedFeed.map((postData) => {
        return <Post postId={postData.post._id} owner={postData.owner} />;
      });
    }
  };

  return (
    <main className="main">
      <div className="feed">
        {isEmpty ? (
          <div className="feed__0follows">
            <div className="feed__0follows-title">
              YOURE NOT FOLLOWING ANYONE
            </div>
            <div className="feed__0follows-text">
              Search a person or hashtag!
            </div>
          </div>
        ) : (
          <div>{displayFeed()}</div>
        )}
      </div>
    </main>
  );
};

// const Comment = (props) => {
//   return (
//     <div className="post__comment">
//       <div className="post__comment-owner">{props.comment.owner}</div>
//       <div className="post__comment-comment">{props.comment.comment} </div>
//     </div>
//   );
// };

// const displayComments = (comments) => {
//   return comments.map((comment) => {
//     return <Comment key={comment._id} comment={comment} />;
//   });
// };

// const Post = (props) => {
//   const [post, setPost] = useState();

//   useEffect(() => {
//     setPost(props);
//   });

//   const onLike = async () => {
//     const updatedPost = post;
//     updatedPost.post.likes++;

//     await fetch(`http://localhost:5000/posts/${post.post._id}`, {
//       method: "POST",
//       body: JSON.stringify(post.post),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     setPost(updatedPost.post);
//   };

//   return (
//     <div className="post">
//       <div className="post__owner">
//         <div className="post__owner-img">
//           <img className="post__owner-pfp" src={profile} alt="temp pfp" />
//         </div>
//         <div className="post__owner-handle">
//           <a href={`/${props.post.op}`}>{props.post.op}</a>
//         </div>
//       </div>
//       <div className="post__img"></div>
//       <div className="post__engage">
//         <div className="post__engage-like">
//           <img src={activity} alt="like" onClick={onLike} />
//         </div>
//         <div className="post__engage-comment">
//           <img src={comment} alt="comment" />
//         </div>
//         <div className="post__engage-share">
//           <img src={msg} alt="share" />
//         </div>
//       </div>
//       <div className="post__interact">
//         <div className="post__likes">{`${props.post.likes} likes`}</div>
//         <div className="post__body">
//           <div className="post__body-desc">
//             <p className="post__body-owner">{props.post.op}</p>
//             {props.post.desc}
//           </div>
//           {displayComments(props.post.comments)}
//         </div>
//       </div>
//     </div>
//   );
// };

// const Feed = () => {
//   const [feed, setFeed] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/posts")
//       .then((res) => res.json())
//       .then((posts) => setFeed(posts));
//     return;
//   }, [feed.length]);

//   const displayFeed = () => {
//     return feed.map((post) => {
//       return <Post key={post._id} post={post} />;
//     });
//   };

//   return <div className="feed">{displayFeed()}</div>;
// };

export default Feed;
