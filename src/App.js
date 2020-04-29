import React,{useReducer} from 'react';
import Navbar from './components/Navbar/Navbar'
import {UserContext} from './contexts/contexts'
import './App.css';
import Login from './components/Login/Login'
import Main from './components/Main/Main'
function App() {
  const initialState = {
    isAuthenticated: false,
    user: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        localStorage.setItem("user_id", JSON.stringify(action.payload.user_id));
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
        <div className="App">
        <Navbar/>
        <div>
        {!state.isAuthenticated ? <Login/> : <Main/>}
        </div>
        </div>
  </UserContext.Provider>

  );
}

export default App;
