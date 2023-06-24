import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";

import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export default function EditPost() {
    const {user}=useContext(UserContext)
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch("http://localhost:4000/post/" + id)
            .then((data) => data.json())
            .then((data) => {
                setTitle(data.title);
                setSummary(data.summary);
                setContent(data.content);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title", title);
        data.append("summary", summary);
        data.append("content", content);
        data.append("id", id);
        if(image.length>0) data.append("image", image[0]);
        const response = await fetch("http://localhost:4000/editpost", {
            method: "PUT",
            body: data,
            credentials: "include",
        });
        if (response.ok) {
            setRedirect(true);
        }
    };
    
    if(!user){
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={"/post/"+id} />;
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
            <button type="submit" style={{ marginTop: "15px" }}>
                Edit Post
            </button>
        </form>
    );
}
