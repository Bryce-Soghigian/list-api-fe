import React from "react";
import { Link,useHistory } from "react-router-dom";
import "./nav.css"
export default function Navbar() {
let history = useHistory();
  let token = localStorage.getItem("token");
const clearLocalStorage = ()  => {
    history.push("/Login")
    return localStorage.clear()
}
  if (token) {
    let user_state = localStorage.getItem("user_state");
    user_state = JSON.parse(user_state);
    console.log(user_state.user_id, "state in nav");
    return (
      <div className="nav-container">
        <div className="left-nav">Welcome {user_state.username}</div>
        <div className="right-nav"><button onClick={clearLocalStorage} className="button">Logout</button></div>
      </div>
    );
  } else {
    return (
      <div className="nav-container-login">


            <Link to="/Signup">Signup</Link>
            <Link to ="/Login">Login</Link>

      </div>
    );
  }
}
