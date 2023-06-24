import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function register() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: e.target[0].value,
        password: e.target[1].value,
      }),
    });
    toast.success("Account Registered Successfully", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  return (
    <div className="login-container">
      <img
        src={require("../assets/register.png")}
        alt="login"
        className="login-img"
      />
      <form className="register" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <button className="btn-style" type="submit">
          Register
        </button>
        <h4 style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account? <Link to="/login">Click here</Link>
        </h4>
      </form>
    </div>
  );
}
