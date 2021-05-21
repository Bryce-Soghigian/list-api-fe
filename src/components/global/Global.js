import React, { useEffect, useState } from "react";
import Axios from "axios";
import MapGlobalItem from "./MapGlobalItem";
import "./Global.scss"
export default function Global() {
  const [tierState, setTierState] = useState([]);
  const [current_tier, setCurrentTier] = useState("S");
  const handleChange = e => {
    return setCurrentTier(e.target.value);
  };

  useEffect(() => {
    Axios.get(`https://anime-list-api.herokuapp.com/tier/${current_tier}`)
      .then(res => {
        //removing duplicates
        let new_data = [];
        let set = new Set();
        res.data.map(x => {
          if (set.has(x.listItem)===false) {
            set.add(x.listItem);
            new_data.push(x);
          }
          return
        });
        setTierState(new_data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [current_tier]);
  return (
    <div>
      <div className="top-of-global">
        <h3>Global {current_tier} tier List</h3>
        {tierState.length === 0 ? (
          <div></div>
        ) : (
          <select onChange={handleChange}>
            <option disabled>Choose a tier to view</option>
            <option value="S">S</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
        )}
      </div>
      {tierState.length === 0 ? (
        <h1>Loading</h1>
      ) : (
        <div className="global-container">
          <div className="left"><p className="tier-big-bold">{current_tier}</p></div> 
          <div className="right">
            {tierState.map(x => {
              return <MapGlobalItem state={x} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
