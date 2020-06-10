import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../../contexts/contexts";
import Friend from "./Friend";
import SearchForFriends from "../Search/SearchForFriends";
import "./list.css";
export default function MyFriendsList() {
  const { state, dispatch } = useContext(UserContext);
  console.log(state.friendsList, "console logg");
  useEffect(() => {
    axios
      .get(`https://anime-list-api.herokuapp.com/friend/${state.user.user_id}`)
      .then(res => {
        console.log(res.data);
        let new_data = [];
        let set = new Set();
        res.data.map(x => {
          if (set.has(x.my_username)) {
            console.log("exists");
          } else {
            set.add(x.my_username);
            new_data.push(x);
          }
        });
        dispatch({ type: "fetch_users_friends", payload: new_data });
        // setError(false)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (state.friendsList !== null) {
    return (
      <div>
        <h1>Request to follow a friend!</h1>
        <SearchForFriends />
        <div>
          <h2>The people you follow</h2>
          <div className="following-container">
            {state.friendsList.map(x => {
              return <Friend state={x} />;
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Your friends</h2>
        <p>Loading</p>
      </div>
    );
  }
}
