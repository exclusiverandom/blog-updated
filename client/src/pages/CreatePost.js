import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function CreatePost() {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    data.append("image", image[0]);
    const response = await fetch("http://localhost:4000/createPost", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
      toast.success('New Post Created Successfully', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  };

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="createPost" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
      />
      <input
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        type="text"
        placeholder="Summary"
      />
      <input type="file" onChange={(e) => setImage(e.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button className="btn-style" type="submit" style={{ marginTop: "15px" }}>
        Create Post
      </button>
    </form>
  );
}
