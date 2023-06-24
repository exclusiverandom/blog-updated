import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{minHeight:'100vh',alignItems:'center',justifyContent:'center',display:'flex'}}>
      <div className="not-found-container">
        <h1>
          Oops! It looks like the page you're trying to access doesn't exist{" "}
        </h1>
        <img src={require("../assets/not_found.jpg")} alt="404" />
        <Link to="/">Take me back to home page</Link>
      </div>
    </div>
  );
}
