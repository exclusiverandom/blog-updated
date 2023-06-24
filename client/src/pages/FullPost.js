import React, { useEffect,useContext } from "react";
import { useParams ,Link,Navigate} from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";

export default function FullPost() {
  const {user}=useContext(UserContext)
  const { id } = useParams();
  const [redirect,setRedirect]=React.useState(false)
  const [post, setPost] = React.useState({});
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((data) => data.json())
      .then((data) => setPost(data));
  }, []);

  function deletePost() {
    fetch(`http://localhost:4000/deletepost/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setRedirect(true);
        toast.success('Post Deleted Successfully', {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        // fetchPosts();
      });
  }

  if(redirect) return (<Navigate to={'/'} />)

  if (!post.title) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="full-post">
      <h1>{post.title}</h1>
      <p className="info">
        <a className="author" href="">
          @{post.author}
        </a>
        <time>{formatISO9075(new Date(post.createdAt))}</time>
      </p>
      {user===post.author&&(
        <div className="links">
        <Link to={`/edit/${post._id}`} className="edit">
        Click here to edit
        </Link>    
        <button className="delete" onClick={deletePost}>Click here to Delete</button>
        </div>
    )}
      <img
        className="banner-img"
        src={`http://localhost:4000/${post.image}`}
        alt="post"
      />
      <div
        className="danger"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </div>
  );
}
