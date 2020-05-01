import React, { useContext,useState } from 'react'
import { UserContext } from '../../../contexts/contexts'
import {Link} from 'react-router-dom'
import Axios from 'axios';
export default function UpdateShow() {
    const initialState = {
      listItem: "",
      description: "",
      rating: "",
      genre: ""
    };
    const [postBody, setPostBody] = useState(initialState);
    console.log(postBody)
    const [message,setMessage] = useState("")
    const [submitting,setSubmitting] = useState(false)
const {state} = useContext(UserContext)
console.log(state.UPDATE_ITEM, "state in context")


//===========Functions================
const setDefaultRating = e => {
    e.nativeEvent.stopImmediatePropagation();
    return setPostBody({
        ...postBody,
        rating: state.UPDATE_ITEM.rating
    })
}
const setDefaultDescription = (e) =>{
    e.preventDefault()
    return setPostBody({
        ...postBody,
        description: state.UPDATE_ITEM.description
    })
}
const setDefaultTitle = (e) => {
    e.preventDefault()
    return setPostBody({
        ...postBody,
        listItem: state.UPDATE_ITEM.listItem
    })
}
const setDefaultGenre = e => {
    e.preventDefault()
    return setPostBody({
        ...postBody,
        genre: state.UPDATE_ITEM.genre
    })
}
const handleSubmit = (e) => {
    let current_id = state.UPDATE_ITEM.id
    console.log(current_id,"Id")
    Axios.put(`https://anime-list-api.herokuapp.com/list/${current_id}`,postBody)
    .then( res => {
        console.log(res.data)
        setMessage(`successfully updated ${state.UPDATE_ITEM.listItem}`)
    }).catch(err => {
        setMessage(err)
    })
}
const handleInput = e => {
    setPostBody({
        ...postBody,
            [e.target.name]: e.target.value
    })

}
const handleTier = e => {
    return setPostBody({
        ...postBody,
        rating: e.target.value
    })
}
const handleGenre = e => {
    return setPostBody({
        ...postBody,
        genre: e.target.value
    })
}
if(state.UPDATE_ITEM !== null){
    // let current_id = state.UPDATE_ITEM.id

    return (
        <div>
            <h3>Update {state.UPDATE_ITEM.listItem}</h3>
            <form>
                <h3>Update Name</h3>
                <input name="listItem" onChange={handleInput}  value={postBody.listItem}/>
                <button onClick={setDefaultTitle}>Set To Original Value</button>

                <h3>Update Description</h3>
                
                <textarea name="description" onChange={handleInput} value={postBody.description}/>
                <button onClick={setDefaultDescription}>Set To Original Value</button>
                <h3>Update Rank</h3>
                <select onChange={handleTier}>
                    <option>Select A Tier</option>
                    <option value="S">S</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                </select>
                {/* <button onChange={setDefaultRating}>Set To Original Tier</button> */}
                <h3>Update Genre</h3>
                <select onChange={handleGenre}>
                    <option>PIck A Genre</option>
                    <option value="action">action</option>
                    <option value="adventure">adventure</option>
                    <option value="comedy">comedy</option>   
                    <option value="drama">drama</option>   
                    <option value="ecchi">ecchi</option>   
                    <option value="fantasy">fantasy</option>
                    <option value="game">game</option>       
                    <option value ="harem">harem</option>
                    <option  value="historical">historical</option>
                    <option value="horror">horror</option>
                    <option value="magic">magic</option>
                    <option value="mystery">mystery</option>
                    <option value="psychological">psychological</option>
                    <option value="school">school</option>
                    <option value="slice of life">slice of life</option>
                    <option value="seinen">seinen</option>
                    <option value="shounen">shounen</option>
                    <option value="supernatural">supernatural</option>
                    <option value="romance">romance</option>
                    <option value="sports">sports</option>
                </select>
                {/* <button onClick={setDefaultGenre}>Set genre to Original Genre</button> */}

            </form>
            {postBody.listItem !== "" && postBody.description !=="" && postBody.genre !=="" && postBody.rating !==""? <button className="submit-btn" onClick={handleSubmit}>Submit Anime</button>: <button disabled>Submit Anime</button>}
    <div>{message}</div>
    <div><Link to="/">BACK TO MY LIST</Link></div>
        </div>
    )
}else{
    return (
        <div>
            <h1>PLEASE GO BACK TO THE MAIN PAGE AND SELECT IT AGAIN</h1>
            <Link to="/">Home</Link>
        </div>
    )
}

}
