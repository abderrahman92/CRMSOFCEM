import React, { Component } from "react";
import { Route, Routes,Router } from "react-router-dom";

import "../App.css";


import Login from "../components/login";
import Register from "../components/register";
import Home from "../components/home";
import Profile from "../components/profile";

// import AuthVerify from "./common/auth-verify";


const App = () => {
    return (
      <div>
        <div className="container mt-3">
        <Router>
          <Routes>
            <Route exact path="/home" element={<Home/>}/>
            <Route exact path="/login"  element={<Login/>} />
            <Route exact path="/register"  element={<Register/>} />
            <Route exact path="/profile"  element={<Profile/>} />
          </Routes>
        </Router>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>
    );
  }
  export default App;
