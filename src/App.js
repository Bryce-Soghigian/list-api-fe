import React,{useReducer} from 'react';
import {Route,Redirect} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import {UserContext,UpdateContext} from './contexts/contexts'
import './App.css';
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Main from './components/Main/Main'
import AddAnime from './components/home/AddNewShow/AddAnime';
import UpdateShow from './components/home/UpdateShow/UpdateShow';
function App() {
  const initialState = {
    isAuthenticated: false,
    user: null,
    UPDATE_ITEM:null
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SIGNUP":
        return{
          ...state
        }
       
      case "LOGIN":
        localStorage.setItem("user_id", JSON.stringify(action.payload.user_id));
        localStorage.setItem("user_state",JSON.stringify(action.payload))
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload
        };
      case "LOGOUT":
        localStorage.clear();
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          token: null,
        };
        case "UPDATE_ITEM":
          return{
            ...state,
            isAuthenticated: true,
            UPDATE_ITEM:action.payload

          }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

console.log("State",state)
  return (
  <UserContext.Provider
  value={{
    state,
    dispatch
  }}
  >
  <UpdateContext.Provider>

        <div className="App">
        <Navbar/>
        <Route exact path="/" component={Main}/>
        <Route exact path="/update" component={UpdateShow}/>
        <Route exact path="/new" component={AddAnime}/>
        <Route exact path="/Login" component={Login}/>
        <Route exact path="/Signup" component={Signup}/>

        </div>
  </UpdateContext.Provider>

  </UserContext.Provider>

  );
}

export default App;
