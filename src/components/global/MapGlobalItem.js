import React from "react";

export default function MapGlobalItem(props) {
  return (
    <div className={props.state.rating}>
      <p className="item">{props.state.listItem}</p>
    </div>
  );
}
