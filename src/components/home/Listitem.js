import React, { useState, useContext } from "react";
import "./Listitem.scss";
import {Link} from 'react-router-dom'
import { UserContext } from "../../contexts/contexts";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FcSettings } from "react-icons/fc";
import { TiDelete } from "react-icons/ti";
import Axios from "axios";

export default function Listitem(props) {
  const [open, setOpen] = useState(false);
  const { dispatch } = useContext(UserContext);

  const updateAnime = () => {
    console.log(props.state, "Props.state");
    let value = props.state;
    dispatch({
      type: "UPDATE_ITEM",
      payload: value,
    });
  };

  const deleteAnime = async () => {
    let r = window.confirm("Are you sure you would like to delete that item?");
    if (r === true) {
      let id = props.state.id;
      await Axios.delete(`https://anime-list-api.herokuapp.com/list/${id}`);
      console.log("deleted");
      document.location.reload();
    }
  };
  const toggle = () => {
    setOpen(!open);
  };
  return (
    <div className={props.state.rating}>
      <div className="left">
        <p className="item">{props.state.listItem}</p>

        <div>
          {open ? (
            <>
              <div>
                <h5>Description</h5>
                <p>{props.state.description}</p>
              </div>
              <div>
                {" "}
                GENRE:<b>{props.state.genre}</b>
              </div>
              <div>
                RANK <b>{props.state.rating}</b>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="buttons-container">
        <button id="button" onClick={toggle}>
          <AiOutlineInfoCircle />
        </button>
        <Link to="/update">
        <button id="button" onClick={updateAnime}>

            <FcSettings />
       
        </button>
        </Link>
        <button id="button" onClick={deleteAnime}>
          <TiDelete />
        </button>
      </div>
      {/* <p>rating:{props.state.rating}</p>
    <p>genre:{props.state.genre}</p> */}
    </div>
  );
}
