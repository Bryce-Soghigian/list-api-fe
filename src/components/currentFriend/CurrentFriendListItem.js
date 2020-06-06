import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function CurrentFriendListItem(props) {
  const [open, setOpen] = useState(false);

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
      </div>
    </div>
  );
}
