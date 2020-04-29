import React from 'react'
import "./Listitem.css"
export default function Listitem(props) {

    return (
        <div className="item-container">
           <p>{props.state.listItem}</p>
    <p>rating:{props.state.rating}</p>
    <p>genre:{props.state.genre}</p>
        </div>
    )
}
