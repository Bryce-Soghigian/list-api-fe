import React, { useState, useEffect } from "react";
import axios from "axios";
import FriendRequestItem from "./FriendRequestItem";
import "./Main.css";
export default function ViewFriendRequests() {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    let user_id = localStorage.getItem("user_id");
    axios
      .get(`https://anime-list-api.herokuapp.com/friend/${user_id}`)
      .then(res => {
        console.log(res.data, "res.data");
        let filtered_arr = [];
        let data = res.data;
        data.map(x => {
          if (x.status === "pending") {
            filtered_arr.push(x);
          }
          return
        });
        setFriends(filtered_arr);
        setError(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  if (friends.length === 0 && error === false) {
    return <div>Currently you don't have any pending follow requests</div>;
  } else if (friends.length === 0) {
    return <div>Loading follow requests...</div>;
  } else {
    return (
      <div className="view-friend-request-scrollable-div">
        <h1>My Follow Requests</h1>
        <div>
          <p>Pending Requests</p>
          <div>
            {friends.map(x => {
              return <FriendRequestItem state={x} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}
