import React, { useReducer } from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { UserContext } from "./contexts/contexts";
import { PrivateRoute } from "./secrets/PrivateRoute";
import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Main from "./components/Main/Main";
import AddAnime from "./components/home/AddNewShow/AddAnime";
import UpdateShow from "./components/home/UpdateShow/UpdateShow";
import FriendsHome from "./components/friends/FriendsHome";
import Global from "./components/global/Global";
import CurrentFriend from "./components/currentFriend/CurrentFriend";
import AnimeToWatchHome from "./components/watch/AnimeToWatchHome";
import { reducer, initialState } from "./reducer";
function App() {
  //Removing token when user unloads the page via refresh
  window.onbeforeunload = function () {
    localStorage.clear();
  };

  //Bringing in our global state.
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Global} />
        <PrivateRoute exact path="/watch" component={AnimeToWatchHome} />
        <PrivateRoute exact path="/update" component={UpdateShow} />
        <PrivateRoute exact path="/new" component={AddAnime} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Signup" component={Signup} />
        <PrivateRoute exact path="/CurrentFriend" component={CurrentFriend} />
        <Route exact path="/Main" component={Main} />
        <PrivateRoute exact path="/friends" component={FriendsHome} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
