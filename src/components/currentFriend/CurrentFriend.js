import React, { useContext,useState, useEffect } from 'react'
import CurrentFriendListItem from './CurrentFriendListItem'
import {UserContext} from '../../contexts/contexts'
export default function CurrentFriend() {
    const {state} = useContext(UserContext)

    if(state.currentFriendAnimeList === null){
        return <div>Loading...</div>
    }else{
       
        return (
            <div>
                <h1>{state.getCurrentFriendName}'s List</h1>
                <div>
                   {state.currentFriendAnimeList.map(x => {
                       return <CurrentFriendListItem state={x} />
                   })} 
                </div>
            </div>
        )
    }

}
