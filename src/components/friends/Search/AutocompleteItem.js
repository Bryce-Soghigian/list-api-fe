import React, { useContext,useState } from 'react'
import {UserContext} from '../../../contexts/contexts'
import axios from 'axios'
export default function AutocompleteItem(props) {
    const {dispatch,state} = useContext(UserContext)
    const [local,setLocal] = useState("send request")
    let request_object = {
        "friend_id":props.state.id,
        "my_username":state.username,
        "friend_username":props.state.username,
        "status":"pending"
    }
    //Use the state
    const SendRequest = () => {
        let id = localStorage.getItem("user_id")
        axios.post(`https://anime-list-api.herokuapp.com/friend/${id}`,request_object)
        .then(res => {
            if(res.data){
                setLocal("sent")
                dispatch({type:"send_friend_request",payload:`sent friend request to ${props.state.username}`})
                console.log(res.data)
            }else{
                setLocal("error refresh")
            }

        })
        .catch(err => {
            console.log(err)
        })
    }
    
    
    
    return (
        <div>
    <button onClick={SendRequest}>{local}{` to ${props.state.username}`}</button> 
        </div>
    )
}
