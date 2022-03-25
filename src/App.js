import React, { useRef, useState } from "react";
import { Route, Routes } from "react-router";
import RequireAuth from "./components/RequireAuth";
import { MenuIcon } from "@heroicons/react/outline";
import Div100vh from "react-div-100vh";
import Sidebar from "./pages/Sidebar";
import Chats from "./pages/Chats";
import MessageArea from "./pages/MessageArea";
import { Invite } from "./pages/Invite";
import SignIn from "./pages/SignIn";
import SingUp from "./pages/SignUp";

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
                <Chats
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
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SingUp />} />
    </Routes>
  );
}

export default App;
