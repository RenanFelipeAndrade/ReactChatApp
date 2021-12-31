import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import Login from "./components/Login";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingUp from "./components/SignUp";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path={""} element={<App />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/signup"} element={<SingUp />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
