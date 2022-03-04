import Sidebar from "./components/Sidebar";
import TextChats from "./components/TextChats";
import MessageArea from "./components/MessageArea";
import React, { useState } from "react";
import { Route, Routes } from "react-router";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import RequireAuth from "./components/RequireAuth";

function App() {
  const [activeServer, setActiveServer] = useState(null);
  const [activeChat, setActiveChat] = useState({});
  return (
    <Routes>
      <Route
        path="/"
        element={
          // se não houver usuário logado, redireciona ao login
          <RequireAuth>
            <div className="flex flex-row">
              <Sidebar
                setActiveServer={setActiveServer}
                activeServer={activeServer}
              />
              <TextChats
                setActiveChat={setActiveChat}
                activeServer={activeServer}
                activeChat={activeChat}
              />
              <MessageArea
                activeChat={activeChat}
                activeServer={activeServer}
              />
            </div>
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
