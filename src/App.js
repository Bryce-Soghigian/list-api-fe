import React, { useReducer, useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { UserContext, UpdateContext } from "./contexts/contexts";
import { PrivateRoute } from "./secrets/PrivateRoute";
import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Main from "./components/Main/Main";
import AddAnime from "./components/home/AddNewShow/AddAnime";
import UpdateShow from "./components/home/UpdateShow/UpdateShow";
import FriendsHome from "./components/friends/FriendsHome";
import Global from "./components/global/Global";
function App() {
  //Removing token when user unloads the page via refresh
  window.onbeforeunload = function () {
    localStorage.clear();
  };

  const initialState = {
    isAuthenticated: false,
    username: null,
    user: null,
    UPDATE_ITEM: null,
    userList: null,
    friendMessage: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SIGNUP":
        return {
          ...state,
        };
      case "LOGIN":
        localStorage.setItem("user_id", JSON.stringify(action.payload.user_id));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
          username: action.payload.username,
        };
      case "LOGOUT":
        localStorage.clear();
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          token: null,
        };
      case "UPDATE_ITEM":
        return {
          ...state,
          isAuthenticated: true,
          UPDATE_ITEM: action.payload,
        };
      case "tier-update":
        return {
          ...state,
          current_tier: action.payload.toString(),
        };
      case "genre_update":
        return {
          ...state,
          current_genre: action.payload,
        };
      case "fetching_user_data":
        return {
          ...state,
          userList: action.payload,
        };
      case "send_friend_request":
        return {
          ...state,
          friendMessage: action.payload,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("State", state);
  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <UpdateContext.Provider>
        <div className="App">
          <Navbar />
          <PrivateRoute exact path="/" component={Main} />
          <PrivateRoute exact path="/update" component={UpdateShow} />
          <PrivateRoute exact path="/new" component={AddAnime} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Signup" component={Signup} />
          <PrivateRoute exact path="/Global" component={Global} />
          <PrivateRoute exact path="/friends" component={FriendsHome} />
        </div>
      </UpdateContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
