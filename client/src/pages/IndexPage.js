import React, { useEffect, useState,useContext } from "react";
import Post from "../components/Post";

import { LikeContext } from "../contexts/LikeContext";

export default function IndexPage() {
  const { likedPosts } = useContext(LikeContext);

  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    fetch("http://localhost:4000/posts")
      .then((data) => data.json())
      .then((data) => setPosts(data));
  };

  useEffect(() => {
    fetchPosts();
  }, [likedPosts]);

  return (
    <div className="hero">
      {posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </div>
  );
}
