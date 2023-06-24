import React, { useContext, useEffect, useState } from "react";
import Post from "../components/Post";
import { LikeContext } from "../contexts/LikeContext";
import { Link } from "react-router-dom";

export default function Favourite() {
  const { likedPosts } = useContext(LikeContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/likedposts", { credentials: "include" })
      .then((data) => data.json())
      .then((data) => setPosts(data));
  }, [likedPosts]);

  return (
    <div className="hero">
      {posts.length>0?posts.map((post) => (
        <Post
          key={post._id}
          {...post}
          isLiked={likedPosts.includes(post._id)}
        />
      )):(
        <div className="not-found-container">
          <h1>You haven't liked any posts yet</h1>
          <img src={require("../assets/no_data.jpg")} alt="no data"/>
          <Link to="/">Check Out Posts</Link>

        </div>
      )}
    </div>
  );
}
