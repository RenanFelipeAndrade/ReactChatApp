import Sidebar from "./components/Sidebar";
import TextChats from "./components/TextChats";
import MessageArea from "./components/MessageArea";
import React, { useState } from "react";
import { Route, Routes } from "react-router";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import RequireAuth from "./components/RequireAuth";
import { Invite } from "./components/Invite";

function App() {
  const [activeServer, setActiveServer] = useState(null);
  const [activeChat, setActiveChat] = useState({});
  const [serversDocs, setServersDocs] = useState([]);
  const [chats, setChats] = useState([]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          // se não houver usuário logado, redireciona ao login
          <RequireAuth>
            <div className="flex flex-row">
              <Sidebar
                serversDocs={serversDocs}
                setServersDocs={setServersDocs}
                setActiveServer={setActiveServer}
                activeServer={activeServer}
              />
              <TextChats
                setActiveChat={setActiveChat}
                activeServer={activeServer}
                serversDocs={serversDocs}
                chats={chats}
                setChats={setChats}
                activeChat={activeChat}
              />
              <MessageArea
                activeChat={activeChat}
                serversDocs={serversDocs}
                chats={chats}
                activeServer={activeServer}
              />
            </div>
          </RequireAuth>
        }
      />
      <Route
        path="/invite/:server"
        element={
          <RequireAuth>
            <Invite />
          </RequireAuth>
        }
      ></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
