import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/contexts";
import "./nav.css";
export default function Navbar() {
  let { state } = useContext(UserContext);
  let history = useHistory();
  let token = localStorage.getItem("token");
  const clearLocalStorage = () => {
    history.push("/Login");
    return localStorage.clear();
  };
  if (token) {
    return (
      <div className="nav-container">
        <div className="left-nav">Welcome {state.username}</div>
        <div className="right-nav">
          <Link to="/">Home</Link>
          <Link to="/Friends">Social</Link>
          <Link to="/Main">Personal</Link>
          <Link to="/Watch">Watch</Link>
          <button onClick={clearLocalStorage} className="button">
            Logout
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="nav-container-login">
        <div className="left-nav">
          <Link to="/Login">Please Login to view more</Link>
        </div>
        <div className="right-nav">
          <Link to="/">Home</Link>
          <Link to="/Signup">Signup</Link>
          <Link to="/Login">Login</Link>
        </div>
      </div>
    );
  }
}
