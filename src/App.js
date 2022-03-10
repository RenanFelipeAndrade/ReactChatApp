import Sidebar from "./components/Sidebar";
import TextChats from "./components/TextChats";
import MessageArea from "./components/MessageArea";
import React, { useRef, useState } from "react";
import { Route, Routes } from "react-router";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import RequireAuth from "./components/RequireAuth";
import { Invite } from "./components/Invite";
import { MenuIcon } from "@heroicons/react/outline";
import Div100vh from "react-div-100vh";

function App() {
  const [activeServer, setActiveServer] = useState(null);
  const [activeChat, setActiveChat] = useState({});
  const [chats, setChats] = useState([]);
  const [serversDocs, setServersDocs] = useState([]);
  const menuRef = useRef();

  function toggleOpen() {
    menuRef.current.classList.toggle("menu-active");
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          // se não houver usuário logado, redireciona ao login
          <RequireAuth>
            <Div100vh className="flex flex-row">
              <div ref={menuRef} className="menu">
                <Sidebar
                  serversDocs={serversDocs}
                  setServersDocs={setServersDocs}
                  setActiveServer={setActiveServer}
                  activeServer={activeServer}
                />
                <TextChats
                  setActiveChat={setActiveChat}
                  activeServer={activeServer}
                  setActiveServer={setActiveServer}
                  serversDocs={serversDocs}
                  chats={chats}
                  setChats={setChats}
                  activeChat={activeChat}
                />
                <span id="menu-button" className="hidden" onClick={toggleOpen}>
                  <MenuIcon className="icon" />
                </span>
              </div>
              <div className="h-full flex-grow flex-row">
                <MessageArea
                  activeChat={activeChat}
                  serversDocs={serversDocs}
                  chats={chats}
                  activeServer={activeServer}
                />
              </div>
            </Div100vh>
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
