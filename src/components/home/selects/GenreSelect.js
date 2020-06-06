import React, { useContext } from "react";
import { UserContext } from "../../../contexts/contexts";
import "../AddNewShow/Add.scss";
export default function GenreSelect() {
  const { dispatch } = useContext(UserContext);

  const DispatchGenre = (e) => {
    e.preventDefault();
    return dispatch({ type: "genre_update", payload: e.target.value });
  };

  return (
    <div>
      <select className="select-class" onChange={DispatchGenre}>
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
  );
}
