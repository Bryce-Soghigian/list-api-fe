import React, { useState } from "react";
import "./Listitem.scss";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FcSettings } from "react-icons/fc";
import {TiDelete} from 'react-icons/ti'

export default function Listitem(props) {
  const [showState, setShowState] = useState("hide");
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  return (
    <div className={props.state.rating}>
      <p className="item">{props.state.listItem}</p>
      <button onClick={toggle}>
        <AiOutlineInfoCircle />
      </button>
      <button>
        <FcSettings />
      </button>
      <button><TiDelete/></button>
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
      {/* <p>rating:{props.state.rating}</p>
    <p>genre:{props.state.genre}</p> */}
    </div>
  );
}
