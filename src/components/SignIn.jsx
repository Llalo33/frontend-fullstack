import React, { useEffect, useState } from "react";
import { loginSignIn } from "../features/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SignIn = () => {
  // localStorage.removeItem('token')
  const token = useSelector((state) => state.application.token);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSetName = (e) => {
    setLogin(e.target.value);
  };

  const handleSetPass = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(loginSignIn({ login, password }));
    
    setTimeout(() => {
        window.location.reload()
    }, 500)
  };

  return (
    <form onSubmit={handleSignIn}>
      <input
        type="text"
        value={login}
        placeholder="name"
        onChange={handleSetName}
      />
      <br />
      <input
        type="password"
        value={password}
        placeholder="password"
        onChange={handleSetPass}
      />
      <br />
      <button type="submit">войти</button>
    </form>
  );
};

export default SignIn;
