import React, { useContext } from "react";
import Axios from "axios";
import { UserContext } from "../../contexts/contexts";
import "./item.css";
/**
 * Add a select class taht allows you to update the item by id?
 *
 */
export default function Item(props) {
  const { state } = useContext(UserContext);
  const handleChange = e => {
    Axios.put(``, {
      user_id: state.user.user_id,
      list_item: props.listItem,
      status: e.target.value,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  console.log(props);
  return (
    <div className="item">
      <p>{props.listItem}</p>
      <p>{props.status}</p>

      <select onChange={handleChange}>
        <option>Update Watch Status</option>
        <option value="watch">watch</option>
        <option value="watching">watching</option>
        <option value="completed">completed</option>
      </select>
    </div>
  );
}
