import React, { useContext } from "react";
import { UserContext } from "../../../contexts/contexts";
import "../AddNewShow/Add.scss"

export default function TierSelect(props) {
  const { dispatch } = useContext(UserContext);
  const tier_update = "tier-update";


  const dispatchTier = e => {
    return dispatch({type:tier_update,payload:e.target.value})
  }
  return (
    <div>
      <select
      className="select-class"
      onChange={dispatchTier}
      >
        <option>Select A Tier</option>
        <option value="S">S</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="F">F</option>
      </select>
    </div>
  );
}
