import React, { useEffect, useState } from "react";
import SignUp from "./components/SignUp/SignUp";
import Users from "./components/Users";
import Todo from "./components/Todo";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import { useSelector } from "react-redux";

const App = () => {
  
  const token = useSelector((state) => state.application.token);
  console.log(token);

  if (token) {
    return (
      <Routes>
        <Route path="/todo" element={<Todo />}/>
        <Route path="/" element={<Users />}/>
        <Route path="/auth" element={<SignUp />}/>
        <Route path="/login" element={<Navigate to={'/todo'} />}/>
      </Routes>
    )
  } else {
    return (
      <Routes>
        <Route path="/todo" element={<Todo />}/>
        <Route path="/" element={<Users />}/>
        <Route path="/auth" element={<SignUp />}/>
        <Route path="/login" element={<SignIn />}/>
      </Routes>
    )
  }

  // return (
  //   <div>
  //     <Routes>
  //       <Route path="/todo" element={<Todo />}/>
  //       <Route path="/" element={<Users />}/>
  //       <Route path="/auth" element={<SignUp />}/>
  //       <Route path="/login" element={<SignIn />}/>
  //     </Routes>
  //   </div>
  // );
};

export default App;
