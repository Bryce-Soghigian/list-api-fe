import React from "react";
import Home from "../home/Home";
import Login from '../Login/Login'
export default function Main() {
  let token = localStorage.getItem("token");
  if(token){
    return <Home/>
  }else{
    return <Login/>
  }
}
