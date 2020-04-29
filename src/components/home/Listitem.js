import React, { useState } from "react";
import "./Listitem.scss";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FcSettings } from "react-icons/fc";
import {TiDelete} from 'react-icons/ti'
import Axios from 'axios'
import Swal from 'sweetalert2'

export default function Listitem(props) {
  const [open, setOpen] = useState(false);

  //===

  const  deleteAnime =async() => {
    let r = window.confirm("Are you sure you would like to delete that item?")
      if(r=== true){
        let id = props.state.id
        await Axios.delete(`https://anime-list-api.herokuapp.com/list/${id}`)
       console.log("deleted")
       document.location.reload()
      }
  }
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
      <button id="button">
        <FcSettings />
      </button>
      <button id="button" onClick={deleteAnime}><TiDelete/></button>
      </div>
      {/* <p>rating:{props.state.rating}</p>
    <p>genre:{props.state.genre}</p> */}
    </div>
  );
}
