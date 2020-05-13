import React, { useContext } from 'react'
import {UserContext} from '../../../contexts/contexts'
import {Link} from 'react-router-dom'
import Axios from 'axios'
export default function Friend(props) {
    const {dispatch} = useContext(UserContext)
    
    const fetchUserList = () => {
        Axios.get(`https://anime-list-api.herokuapp.com/list/${props.state.my_id}`)
        .then(res => {
            dispatch({type:"setCurrentFriendUsername", payload: props.state.my_username})
            dispatch({type:"setCurrentFriend", payload:res.data})
            console.log(res.data)
        }).catch(err => {
            console.error(err)
        })
        
    }



    return (
        <div >
            {/* <p>{props.state.my_username}</p> */}
            <button className="set-to-origin" onClick={fetchUserList}><Link to="/CurrentFriend">{`View ${props.state.my_username}\'s List`}</Link></button>
        </div>
    )
}
