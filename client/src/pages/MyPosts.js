import React from "react";
import Post from "../components/Post";
import { Link } from "react-router-dom";

export default function MyPosts() {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:4000/myPosts", { credentials: "include" })
      .then((data) => data.json())
      .then((data) => setPosts(data))
      .then(console.log(posts));
  }, []);
  return (
    <div className="hero">
      {posts.length>0?posts.map((post) => (
        <Post {...post} />
      )):(
        <div className="not-found-container">
          <h1>You haven't Published any posts yet</h1>
          <img src={require("../assets/no_data2.jpg")} alt="no data"/>
          <Link to="/create">Create New Posts</Link>

        </div>
      )}
    </div>
  );
}
