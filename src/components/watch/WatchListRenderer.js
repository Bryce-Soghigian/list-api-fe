import React, { useContext } from "react";
import { UserContext } from "../../contexts/contexts.js";
import Item from "./Item";
import LoadingSquare from "./LoadingSquare";
export default function WatchListRenderer() {
  const { state } = useContext(UserContext);

  if (state.watchList !== null || state.watchList.length !== 0) {
    return (
      <div>
        {state.watchList.map(watchItem => {
          if (watchItem.list_item !== "") {
            return (
              <Item status={watchItem.status} listItem={watchItem.list_item} />
            );
          }
          return ""
        })}
      </div>
    );
  } else {
    return (
      <div>
        <LoadingSquare />
      </div>
    );
  }
}
