import React, { useContext, useState } from "react";
import { UserContext } from "../../../contexts/contexts";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./Update.css";
export default function UpdateShow() {
  const initialState = {
    listItem: "",
    description: "",
    rating: "",
    genre: "",
  };
  const [postBody, setPostBody] = useState(initialState);
  console.log(postBody);
  const [message, setMessage] = useState("");
  const { state } = useContext(UserContext);

  //===========Functions================

  const setDefaultDescription = e => {
    e.preventDefault();
    return setPostBody({
      ...postBody,
      description: state.UPDATE_ITEM.description,
    });
  };
  const setDefaultTitle = e => {
    e.preventDefault();
    return setPostBody({
      ...postBody,
      listItem: state.UPDATE_ITEM.listItem,
    });
  };

  const handleSubmit = e => {
    let current_id = state.UPDATE_ITEM.id;
    console.log(current_id, "Id");
    Axios.put(
      `https://anime-list-api.herokuapp.com/list/${current_id}`,
      postBody,
    )
      .then(res => {
        console.log(res.data);
        setMessage(`successfully updated ${state.UPDATE_ITEM.listItem}`);
      })
      .catch(err => {
        setMessage(err);
      });
  };
  const handleInput = e => {
    setPostBody({
      ...postBody,
      [e.target.name]: e.target.value,
    });
  };
  const handleTier = e => {
    return setPostBody({
      ...postBody,
      rating: e.target.value,
    });
  };
  const handleGenre = e => {
    return setPostBody({
      ...postBody,
      genre: e.target.value,
    });
  };
  if (state.UPDATE_ITEM !== null) {
    return (
      <div className="update-container">
        <div className="card-update">
          <div className="title-top-div">
            <h3 className="title-in-update">
              Update {state.UPDATE_ITEM.listItem}
            </h3>
          </div>
          <form>
            <div className="main-div-update">
              <div>
                <h3>Update Name</h3>
                <div className="update-name-middle">
                  <input
                    type="search"
                    name="listItem"
                    onChange={handleInput}
                    value={postBody.listItem}
                  />
                  <button className="set-to-origin" onClick={setDefaultTitle}>
                    Set To Original Value
                  </button>
                </div>
              </div>

              <h3>Update Description</h3>

              <textarea
                className="text-area-update"
                name="description"
                onChange={handleInput}
                value={postBody.description}
              />
              <button
                className="set-description-update"
                onClick={setDefaultDescription}>
                Set To Original Value
              </button>

              <div className="left-to-right">
                <div>
                  <h3>Update Rank</h3>
                  <select className="select-item-update" onChange={handleTier}>
                    <option>Select A Tier</option>
                    <option value="S">S</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                  </select>
                </div>
                <div>
                  <h3>Update Genre</h3>
                  <select className="select-item-update" onChange={handleGenre}>
                    <option>Pick A Genre</option>
                    <option value="action">action</option>
                    <option value="adventure">adventure</option>
                    <option value="comedy">comedy</option>
                    <option value="drama">drama</option>
                    <option value="ecchi">ecchi</option>
                    <option value="fantasy">fantasy</option>
                    <option value="game">game</option>
                    <option value="harem">harem</option>
                    <option value="historical">historical</option>
                    <option value="horror">horror</option>
                    <option value="magic">magic</option>
                    <option value="mystery">mystery</option>
                    <option value="psychological">psychological</option>
                    <option value="school">school</option>
                    <option value="slice of life">slice of life</option>
                    <option value="seinen">seinen</option>
                    <option value="shounen">shounen</option>
                    <option value="supernatural">supernatural</option>
                    <option value="romance">romance</option>
                    <option value="sports">sports</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
          {postBody.listItem !== "" &&
          postBody.description !== "" &&
          postBody.genre !== "" &&
          postBody.rating !== "" ? (
            <button className="set-to-origin" onClick={handleSubmit}>
              Submit Anime
            </button>
          ) : (
            <button disabled>Submit Anime</button>
          )}
          <div className="error-in-update">{message}</div>
          <div>
            <Link to="/">BACK TO MY LIST</Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>PLEASE GO BACK TO THE MAIN PAGE AND SELECT IT AGAIN</h1>
        <Link to="/">Home</Link>
      </div>
    );
  }
}
