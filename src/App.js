import "./css/app.css";
import Sidebar from "./components/Sidebar";
import TextChats from "./components/TextChats";
import MessageArea from "./components/MessageArea";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "./firebase/init";
import { Navigate, Route, Routes } from "react-router";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          currentUser !== null ? (
            <div className="columns h-screen">
              <Sidebar />
              <TextChats></TextChats>
              <MessageArea></MessageArea>
            </div>
          ) : (
            <Navigate to={"/login"} replace />
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
