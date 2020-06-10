import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/contexts";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import "./Login.css";
export const Login = () => {
  const { dispatch } = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const initialState = {
    username: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };
  const [data, setData] = useState(initialState);
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    let post_object = {
      username: data.username,
      password: data.password,
    };
    axios
      .post("https://anime-list-api.herokuapp.com/user/login", post_object)
      .then(res => {
        let value = res.data;
        dispatch({
          type: "LOGIN",
          payload: value,
        });
        history.replace(from);
      })
      .catch(err => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: err.message || err.statusText,
        });
      });
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="container">
          <form>
            <h1>Login</h1>

            <label htmlFor="username">
              Username
              <input
                placeholder="username"
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
                placeholder="password"
                type="password"
                value={data.password}
                onChange={handleInputChange}
                name="password"
                id="password"
              />
            </label>
            <div className="error-div">
              {data.errorMessage && (
                <span className="form-error">{data.errorMessage}</span>
              )}
            </div>

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
