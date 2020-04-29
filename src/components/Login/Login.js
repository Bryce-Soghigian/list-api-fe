import React, { useState,useContext } from "react";
import {UserContext } from '../../contexts/contexts'
import axios from "axios";
export const Login = () => {
    const {dispatch} =useContext(UserContext)
  const initialState = {
    username: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };
  const [data, setData] = useState(initialState);
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    let post_object = {
        username:data.username,
        password:data.password
    };
    axios.post("https://anime-list-api.herokuapp.com/user/login", post_object)
    .then(res => {
        console.log(res.data)
        let value = res.data
        dispatch({
            type:"LOGIN",
            payload: value
        })

    }).catch(err => {
        setData({
            ...data,
            isSubmitting: false,
            errorMessage: err.message || err.statusText
        })
    })
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="container">
          <form>
            <h1>Login</h1>

            <label htmlFor="username">
              username
              <input
                type="text"
                value={data.username}
                onChange={handleInputChange}
                name="username"
                id="username"
              />
            </label>

            <label htmlFor="password">
              Password
              <input
                type="password"
                value={data.password}
                onChange={handleInputChange}
                name="password"
                id="password"
              />
            </label>

            {data.errorMessage && (
              <span className="form-error">{data.errorMessage}</span>
            )}

            <button disabled={data.isSubmitting} onClick={handleSubmit}>
              {data.isSubmitting ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
