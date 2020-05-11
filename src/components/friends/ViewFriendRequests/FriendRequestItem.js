import React, { useContext, useState } from "react";
import { UserContext } from "../../../contexts/contexts";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import * as Swal from "sweetalert2";
import "./Main.css";

export default function FriendRequestItem(props) {
  const [error, setError] = useState("");
  const [statusAccept, setStatusAccept] = useState("Accept Request");
  const [statusDelete, setStatusDelete] = useState("Deny Request");
  const { history } = useHistory();
  const UpdateFriendRequest = () => {
    Axios.put(`https://anime-list-api.herokuapp.com/friend/${props.state.id}`, {
      status: "accepted",
    })
      .then((res) => {
        setStatusAccept("Accepted");
        Swal.fire({
          title: `Successfully added ${props.state.friend_username}`,
          icon: "success",
        });
      })
      .catch((err) => {
        Swal.fire("Failed To Accept!", "error");
        console.log(err);
        setError(JSON.stringify(err));
      });
  };
  const DenyRequest = () => {
    Axios.delete(
      `https://anime-list-api.herokuapp.com/friend/delete/${props.state.id}`
    )
      .then((res) => {
        setStatusDelete(true);
        console.log(res);
        Swal.fire("Deleted Friend!", "success");
      })
      .catch((err) => {
        Swal.fire("Failed Delete!", "error");
        console.log(err);
        setError(JSON.stringify(err));
      });
  };
  if (statusDelete === true) {
    return <div></div>;
  } else {
    return (
      <div className="friend-request-item-container">
        <p>Request from:{props.state.my_username}</p>
        <div className="button-container-friend">
          <button onClick={UpdateFriendRequest} id="accepted">{statusAccept}</button>
          {statusAccept === "Accepted" ? (
            <div>{""}</div>
          ) : (
            <button onClick={DenyRequest} id="deny">{statusDelete}</button>
          )}
        </div>
      </div>
    );
  }
}
