import React, { useState, useEffect, useContext, useCallback } from "react";
import { formatISO9075 } from "date-fns";
import { Link, Navigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { LikeContext } from "../contexts/LikeContext";
import { toast } from "react-toastify";

export default function Post({
  title,
  summary,
  image,
  createdAt,
  author,
  _id,
  likedBy,
}) {
  const { likedPosts, toggleLikedPost } = useContext(LikeContext);
  const [redirect, setRedirect] = useState(false);
  const [likeCount, setLikeCount] = useState(likedBy.length);

  const checkLiked = useCallback(() => {
    return likedPosts.includes(_id);
  }, [likedPosts, _id]);

  const [isLiked, setIsLiked] = useState(checkLiked());

  useEffect(() => {
    setIsLiked(checkLiked());
  }, [likedPosts, _id, checkLiked]);

  async function handleLike() {
    let response;
    if (isLiked) {
      response = await fetch("https://blog-point.onrender.com/unlike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: _id }),
        credentials: "include",
      });
      setLikeCount((prevCount) => prevCount - 1);
    } else {
      response = await fetch("https://blog-point.onrender.com/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: _id }),
        credentials: "include",
      });
      setLikeCount((prevCount) => prevCount + 1);
    }
    console.log("handlelike complete & isliked ", isLiked);
    if (response.status === 200) {
      if (isLiked) {
        toast.info("Removed from Favourites", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.info("Added to Favourites", {
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
      toggleLikedPost(_id);
    } else setRedirect(true);
  }

  useEffect(() => {
    console.log("id=", _id, "isLiked=", isLiked, "likeCount=", likeCount);
  }, [likeCount,_id,isLiked]);

  useEffect(() => {
    console.log("id rendered new ", _id);
  }, [_id]);

  if (redirect) return <Navigate to="/login" />;

  return (
    <div className="post">
      <Link to={`/post/${_id}`}>
        <img src={"https://blog-point.onrender.com/" + image} alt="post" />
      </Link>
      <div className="post-content">
        <div className="headnlike">
          <h2>{title}</h2>
          <h2 className="like-icon">
            <AiFillHeart
              onClick={handleLike}
              color={isLiked ? "#dc1d1d" : "#888"}
              style={{ cursor: "pointer" }}
            />{" "}
            {likeCount}
          </h2>
        </div>
        <p className="info">
          {/* <a className="author" href=""> */}
            {author}
          {/* </a> */}
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p>{summary}</p>
        <Link to={`/post/${_id}`} className="post-link">
          READ MORE
        </Link>
      </div>
    </div>
  );
}
