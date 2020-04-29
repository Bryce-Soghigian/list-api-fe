import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import Listitem from './Listitem'
import "./main.css"
export default function Home() {
const [errorState,setError] = useState("")
const [localState, setLocal] = useState([])
const [sorting,setSorting] = useState(false)
useEffect(() => {

let id = localStorage.getItem("user_id")
Axios.get(`https://anime-list-api.herokuapp.com/list/${id}`)
.then(res => {
   setLocal(res.data)
}).catch(err => {
setError(err)
})
}, [])
if(localState.length === 0 || sorting === true){
return(
    <div>
        <p>Rendering your anime list</p>
    </div>
)
}
    return (
        <div>
            <div className="top">
                <h1>My Anime List</h1>
    <div className="list-items">{localState.map( x => {
        return <Listitem state={x}/>
    })}</div>
            </div>
        </div>
    )
}
