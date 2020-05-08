import React, { useReducer } from "react";
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
import CurrentFriend from './components/currentFriend/CurrentFriend'
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
    friendsList:null,
    currentFriendAnimeList:null,
    getCurrentFriendName: null
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
      case "fetch_users_friends":
        return {
          ...state,
          friendsList:action.payload
        };
      case "setCurrentFriend":
        console.log(action.payload,"current friends anime list")
        let mapArray = action.payload
        let S = [];
        let A = [];
        let B = [];
        let C = [];
        let D = [];
        let F = [];
        mapArray.map( item => {
            if (item.rating === "S") {
                S.push(item);
              }
              if (item.rating === "A") {
                A.push(item);
              }
              if (item.rating === "B") {
                B.push(item);
              }
              if (item.rating === "C") {
                C.push(item);
              }
              if (item.rating === "D") {
                D.push(item);
              }
              if (item.rating === "F") {
                F.push(item);
              }
        })
        let newState = S.concat(A, B, C, D, F)
        return {
          ...state,
          currentFriendAnimeList:newState
        }
      case "setCurrentFriendUsername":
        return {
          ...state,
          getCurrentFriendName:action.payload
        }

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
          <PrivateRoute exact path="/CurrentFriend" component={CurrentFriend} />
          <PrivateRoute exact path="/Global" component={Global} />
          <PrivateRoute exact path="/friends" component={FriendsHome} />
        </div>
      </UpdateContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
