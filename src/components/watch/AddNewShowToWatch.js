import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/contexts";
import Axios from "axios";

export default function AddNewShowToWatch() {
  const { state } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    list_item: "",
    status: "Need To Watch",
  });
  const handleInput = e => {
    console.log("event", e.target.value);
    setFormData({
      ...formData,
      list_item: e.target.value,
    });
  };
  const handleChange = e => {
    setFormData({
      ...formData,
      status: e.target.value,
    });
  };
  const watchPostRequest = postObject => {
    postObject = {
      user_id: state.user.user_id,
      list_item: formData.list_item,
      status: formData.status,
    };

    Axios.post(`https://anime-list-api.herokuapp.com/watch/`, postObject)
      .then(res => {
        console.log(res.data);
        setMessage(
          `Successfully added ${formData.list_item} to your watch list`,
        );
      })
      .catch(err => {
        console.log("ERRRR");
        setMessage(`Error posting ${formData.list_item}`);
        console.log(err);
      });
  };
  return (
    <div>
      <div className="card-in-add-watch">
        <form>
          <input
            onChange={handleInput}
            value={formData.list_item}
            name="listItem"
          />
        </form>
        <select onChange={handleChange}>
          <option value="watch">watch</option>
          <option value="watching">watching</option>
          <option value="completed">completed</option>
        </select>
        <button onClick={watchPostRequest}>Add</button>
        <div className="message">{message}</div>
      </div>
    </div>
  );
}

//Need To Watch
//Watching
//Completed

//Have 3 status
//Completed. If you select the show to be completed it will add the show to your anime list
//Watching.
//Need To Watch
