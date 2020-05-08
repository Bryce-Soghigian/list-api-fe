import React from 'react'
import SearchForFriends from './Search/SearchForFriends'
import ViewFriendRequests from './ViewFriendRequests/ViewFriendRequests'
import "./Friends.css"
export default function FriendsHome() {
    return (
        <div className="friends-main-container">
            <SearchForFriends/>
            <ViewFriendRequests />
        </div>
    )
}
