import React from 'react'
import ViewFriendRequests from './ViewFriendRequests/ViewFriendRequests'
import MyFriendsList from './MyFriendsList/MyFriendsList'
import "./Friends.css"
export default function FriendsHome() {
    return (
        <div className="friends-main-container">
             <ViewFriendRequests className="view-requests" />
            <MyFriendsList />
        </div>
    )
}
