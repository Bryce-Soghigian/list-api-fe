import React, { useEffect, useState } from "react";
import Axios from "axios";
import Listitem from "./Listitem";
import "./main.css";
import {Link} from 'react-router-dom'
import {FcAbout} from 'react-icons'
export default function Home() {
  const [errorState, setError] = useState("");
  const [localState, setLocal] = useState([]);
  const [sorting, setSorting] = useState(false);
  useEffect(() => {
    let id = localStorage.getItem("user_id");
    //Gets users anime list
    Axios.get(`https://anime-list-api.herokuapp.com/list/${id}`)
      .then((res) => {
          // map through array. push all the values into subarrays
          //merge subarrays and set state as sorted value

          console.log(res.data,"user items")

        // let result = []
        // result.concat(S,A)
        setSorting(true)
        let S = []
        let A = []
        let B = []
        let C = []
        let D = []
        let F = []
        let map_array = Array.from(res.data)
        map_array.map( item => {
            console.log(item,"current item")
            if(item.rating === "S"){
                S.push(item)
            }
            if(item.rating ==="A"){
                A.push(item)
            }
            if(item.rating==="B"){
                B.push(item)
            }
            if(item.rating==="C"){
                C.push(item)
            }
            if(item.rating==="D"){
                D.push(item)
            }
            if(item.rating ==="F"){
                F.push(item)
            }
        })
       let cur_state = Array.from(S.concat(A,B,C,D,F))
        setLocal(cur_state)
        setSorting(false)
      })
      .catch((err) => {
        setError(err);
      });
  }, []);
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
        <h1>My Anime List</h1>
  <h3>{errorState}</h3>
        <div className="list-items">
          {localState.map((x) => {
            return <Listitem state={x} />;
          })}
         <div className="item-container"><Link to="/new">Click Here To Add A New Show</Link></div>

        </div>
      </div>
    </div>
  );
}
