import React, { useEffect, useState } from "react";
import Axios from "axios";
import Listitem from "./Listitem";
import "./main.css";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
export default function Home() {
  const [errorState, setError] = useState("");
  const [localState, setLocal] = useState([]);
  const [sortedState, setSorted] = useState();
  const [sorting, setSorting] = useState(false);
  useEffect(() => {
    let id = localStorage.getItem("user_id");
    //Gets users anime list
    Axios.get(`https://anime-list-api.herokuapp.com/list/${id}`)
      .then((res) => {
        // map through array. push all the values into subarrays
        //merge subarrays and set state as sorted value

        console.log(res.data, "user items");

        // let result = []
        // result.concat(S,A)
        setSorting(true);
        let S = [];
        let A = [];
        let B = [];
        let C = [];
        let D = [];
        let F = [];
        let map_array = Array.from(res.data);
        map_array.map((item) => {
          console.log(item, "current item");
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
        setSorting(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);
  const FilterByGenre = (e) => {
    setSorting(true);

    let new_state = [];
    localState.map((x) => {
      console.log("SORTING");
      if (e.target.value === x.genre) {
        new_state.push(x);
      }
      if (e.target.value === "all") {
        new_state.push(x);
      }
    });

    setSorted(new_state);
    setSorting(false);
  };
  const FilterByTier = (e) => {
    setSorting(true);
    let new_state = [];
    localState.map((x => {
        if(e.target.value === x.rating){
            new_state.push(x)
        }
        if(e.target.value === "all"){
            new_state.push(x)
        }
    }))

    setSorted(new_state);
    setSorting(false);

  };
  if (localState.length === 0 || sorting === true) {
    return (
      <div>
        <p>Rendering your anime list</p>
      </div>
    );
  }
  return (
    <div>
      <div className="top">
        <div>
          <h3>My Anime List(List currently contains {sortedState.length} items)</h3>
          <select onChange={FilterByGenre}>
            <option>Filter By Genre</option>
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
          <select onChange={FilterByTier}>
            <option>Filter By Tier</option>
            <option value="all">All</option>
            <option value="S">S</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
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
    </div>
  );
}
