import Sidebar from "./components/Sidebar";
import TextChats from "./components/TextChats";
import MessageArea from "./components/MessageArea";
import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import useAuth from "./hooks/useAuth";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  const currentUser = useAuth();
  return (
    <Routes>
      <AuthContextProvider>
        <Route
          path="/"
          element={
            // se não houver usuário logado, redireciona ao login
            currentUser !== null ? (
              <div className="flex flex-row">
                <Sidebar />
                <TextChats></TextChats>
                <MessageArea></MessageArea>
              </div>
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        />
      </AuthContextProvider>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
