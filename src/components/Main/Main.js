import React from "react";
import {Redirect} from 'react-router-dom'
import Home from '../home/Home'
export default function Main() {
let token = localStorage.getItem("token")
  return (
    <div>
      {token? <Home /> : <Redirect to="/login" />}
    </div>
  );
}
