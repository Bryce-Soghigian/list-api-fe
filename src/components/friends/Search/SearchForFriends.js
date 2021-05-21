import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AutocompleteSuggestions from "./AutocompleteSuggestions";
import { UserContext } from "../../../contexts/contexts";
import "./Search.css";
export default function SearchForFriends() {
  const { state, dispatch } = useContext(UserContext);
  const [error, setError] = useState("");
  const [matches, setMatch] = useState([]);
  const [input, setInput] = useState("");
  //Autocomplete logic
  const search = e => {
    e.preventDefault();
    setInput(e.target.value);
    let match_arr = [];
    if (state.userList !== null) {
      state.userList.map(x => {
        if (x.username.includes(e.target.value) === true) {
          match_arr.push(x);
        }
      });
    }
    setMatch(match_arr);
  };

useEffect(() => {
  axios
  .get("https://anime-list-api.herokuapp.com/user/")
  .then(res => {
    setError(false);
    dispatch({ type: "fetching_user_data", payload: res.data });
  })
  .catch(err => {
    console.error(err);
    setError("ERROR");
  });
}, [])
  if (error === false && state.userList !== null) {
    return (
      <div>
        <input
          className="search-in-friends"
          value={input}
          placeholder="Search For Friends"
          onChange={search}
        />
        <div>
          <AutocompleteSuggestions input={input} matches={matches} />
          <p>{state.friendMessage}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Fetching data...</h1>
      </div>
    );
  }
}
