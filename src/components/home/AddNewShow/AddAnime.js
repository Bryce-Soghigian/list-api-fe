import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./Add.scss";
export default function AddAnime() {
  let id = localStorage.getItem("user_id");
  const initialState = {
    listItem: "",
    description: "",
    rating: "",
    genre: "",
    userId: id,
  };
  const [postBody, setPostBody] = useState(initialState);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (e) => {
    setSubmitting(true);
    Axios.post("https://anime-list-api.herokuapp.com/list/", postBody)
      .then((res) => {
        if (res.data) {
          setMessage(`Successfully Posted ${postBody.listItem}`);
          setSubmitting(false);
        }
      })
      .catch((err) => {
        setMessage(JSON.stringify(err));
        setSubmitting(false);
      });
    setPostBody({
      listItem: "",
      description: "",
      rating: "",
      genre: "",
      userId: id,
    });
  };
  const handleInput = (e) => {
    setPostBody({
      ...postBody,
      [e.target.name]: e.target.value,
    });
  };
  const handleTier = (e) => {
    return setPostBody({
      ...postBody,
      rating: e.target.value,
    });
  };
  const handleGenre = (e) => {
    return setPostBody({
      ...postBody,
      genre: e.target.value,
    });
  };
  console.log(postBody);
  return (
    <div className="add-item-container">
      <div className="card-within-add"></div>
      <form id="add">
        <div className="center-add-plus-red">
          <div className="input-within-add">
            <h1>Add New Show</h1>
          </div>

          <div className="input-within-add">
            <h3>Title</h3>
            <input
              // className="input-within-add"
              value={postBody.listItem}
              onChange={handleInput}
              name="listItem"
              id="listItem"
            />
          </div>

          <div className="input-within-add">
            <h3>description</h3>
            <input
              value={postBody.description}
              onChange={handleInput}
              name="description"
              id="description"
            />
          </div>
          <div className="input-within-add">
            <h3>Ranking</h3>
            <select onChange={handleTier} className="select-class">
              <option>Select A Tier</option>
              <option value="S">S</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
          </div>
          <div className="input-within-add">
            <h3>Primary Genre</h3>
            <select onChange={handleGenre} className="select-class">
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
      </form>
      <div>
        {postBody.listItem !== "" &&
        postBody.description !== "" &&
        postBody.genre !== "" &&
        postBody.rating !== "" ? (
          <button className="submit-btn" onClick={handleSubmit}>
            Submit Anime
          </button>
        ) : (
          <button disabled>Submit Anime</button>
        )}
      </div>
      <div>{submitting ? <p>Submitting...</p> : ""}</div>
      <div>
        <p>{message}</p>
      </div>
      <div>
        <Link to="/" className="white">
          Back To My List
        </Link>
      </div>
    </div>
  );
}
