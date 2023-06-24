import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: e.target[0].value,
        password: e.target[1].value,
      }),
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((username) => {
        toast.success("Logged In Successfully", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setUser(username);
        setRedirect(true);
      });
    } else {
      // alert("login failed");
      // toast("login failed");
      toast.error("Invalid Credentials", {
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
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="login-container">
      <img
        src={require("../assets/login.png")}
        alt="login"
        className="login-img"
      />

      <form className="login" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <button className="btn-style" type="submit">
          Login
        </button>
        <h4 style={{ textAlign: "center", marginTop: "10px" }}>
          Don't have an account? <Link to="/register">Click here</Link>
        </h4>
      </form>
    </div>
  );
}
