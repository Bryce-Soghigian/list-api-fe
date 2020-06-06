import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import Listitem from "./Listitem";
import "./main.css";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
export default function Home() {
  const [errorState, setError] = useState("");
  const [localState, setLocal] = useState([]);
  const [SuccessfulGet, setSuccessfulGet] = useState(false);
  const [sortedState, setSorted] = useState([]);

  useEffect(() => {
    //Gets users anime list
    let user_id = localStorage.getItem("user_id");
    Axios.get(`https://anime-list-api.herokuapp.com/list/${user_id}`)
      .then((res) => {
        // map through array. push all the values into subarrays
        //merge subarrays and set state as sorted value

        setSuccessfulGet(true);
        let S = [];
        let A = [];
        let B = [];
        let C = [];
        let D = [];
        let F = [];
        let map_array = Array.from(res.data);
        map_array.map((item) => {
          if (item.rating === "S") {
            S.push(item);
          }
          if (item.rating === "A") {
            A.push(item);
          }
          if (item.rating === "B") {
            B.push(item);
          }
          if (item.rating === "C") {
            C.push(item);
          }
          if (item.rating === "D") {
            D.push(item);
          }
          if (item.rating === "F") {
            F.push(item);
          }
        });
        let cur_state = Array.from(S.concat(A, B, C, D, F));
        setLocal(cur_state);
        setSorted(cur_state);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);
  const FilterByGenre = (e) => {
    let new_state = [];
    localState.map((x) => {
      if (e.target.value === x.genre) {
        new_state.push(x);
      }
      if (e.target.value === "all") {
        new_state.push(x);
      }
    });

    setSorted(new_state);
  };
  const FilterByTier = (e) => {
    let new_state = [];
    localState.map((x) => {
      if (e.target.value === x.rating) {
        new_state.push(x);
      }
      if (e.target.value === "all") {
        new_state.push(x);
      }
    });

    setSorted(new_state);
  };

  if (localState.length === 0 && SuccessfulGet === true) {
    return (
      <div className="center">
        <p className="no-items">Please add a show to your list</p>
        <div className="item-container">
          <Link to="/new">
            <AiFillPlusCircle />
          </Link>
        </div>
      </div>
    );
  } else if (localState.length === 0 && SuccessfulGet === false) {
    return (
      <div>
        <p>rendering your anime list</p>
        <div className="item-container">
          <Link to="/new">
            <AiFillPlusCircle />
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="home-primary-container">
        <div>
          <h3>My List(List currently contains {sortedState.length} items)</h3>
          <select className="select-class-home" onChange={FilterByGenre}>
            <option disabled>Filter By Genre</option>
            <option value="all">All</option>
            <option value="action">action</option>
            <option value="adventure">adventure</option>
            <option value="comedy">comedy</option>
            <option value="drama">drama</option>
            <option value="ecchi">ecchi</option>
            <option value="fantasy">fantasy</option>
            <option value="game">game</option>
            <option value="harem">harem</option>
            <option value="historical">historical</option>
            <option value="horror">horror</option>
            <option value="magic">magic</option>
            <option value="mystery">mystery</option>
            <option value="psychological">psychological</option>
            <option value="school">school</option>
            <option value="slice of life">slice of life</option>
            <option value="romance">romance</option>
            <option value="seinen">seinen</option>
            <option value="shounen">shounen</option>
            <option value="supernatural">supernatural</option>
            <option value="sports">sports</option>
          </select>
          <select className="select-class-home" onChange={FilterByTier}>
            <option disabled>Filter By Tier</option>
            <option value="all">All</option>
            <option value="S">S</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
          <div className="center">
            <Link to="/new">
              <AiFillPlusCircle />
            </Link>
          </div>
        </div>

        <h3>{errorState}</h3>
        <div className="list-items">
          {sortedState.map((x) => {
            return <Listitem state={x} />;
          })}
          <div className="item-container">
            <Link to="/new">
              <AiFillPlusCircle />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
