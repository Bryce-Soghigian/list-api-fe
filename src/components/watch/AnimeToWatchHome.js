import React, { useEffect, useContext } from "react";
import { UserContext } from "../../contexts/contexts";
import Axios from "axios";
import LoadingSquare from "./LoadingSquare";
import AddNewShowToWatch from "./AddNewShowToWatch";
export default function AnimeToWatchHome() {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    Axios.get(
      `https://anime-list-api.herokuapp.com/watch/${state.user.user_id}`
    )
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "myWatchList", payload: res.data });
      })
      .catch((err) => {});
  }, []);
  if (state.watchList === null) {
    return (
      <div>
        Loading <LoadingSquare />
      </div>
    );
  } else if (state.watchList.length === 0) {
    return (
      <div>
        Please Add A Show
        <div>
          <AddNewShowToWatch />
        </div>
      </div>
    );
  }
  return <div></div>;
}
