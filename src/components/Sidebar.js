import "../css/app.css";
import { PlusIcon } from "@heroicons/react/outline";
import { getAuth, signOut } from "firebase/auth";
import { Navigate } from "react-router";
import Modal, { useModal } from "./Modal";
import { useEffect } from "react";
import serverListener from "../firebase/serverListener";
import { useAuth } from "../context/AuthContext";
import { ServerForm } from "./ServerForm";
import { ServerList } from "./ServerList";

function Sidebar({
  activeServer,
  setActiveServer,
  setServersDocs,
  serversDocs,
}) {
  const { userData } = useAuth();
  const { isVisible, toggleModal } = useModal();

  // useeffect para atualizar os servidores em tempo real
  useEffect(() => {
    serverListener(userData, setServersDocs);
  }, [userData, setServersDocs]);

  return (
    <div className="sidebar-container">
      <ul>
        <ServerList
          activeServer={activeServer}
          serversDocs={serversDocs}
          setActiveServer={setActiveServer}
        />
        <li onClick={toggleModal}>
          <button type="button" className="sidebar-item">
            <PlusIcon className="icon" />
          </button>
        </li>
      </ul>
      <button
        type="button"
        className="danger-button"
        onClick={() => {
          const auth = getAuth();
          signOut(auth)
            .then(() => {
              <Navigate to={"/login"} replace />;
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        Sair
      </button>
      <Modal isVisible={isVisible} toggleModal={toggleModal}>
        <ServerForm currentUser={userData} toggleModal={toggleModal} />
      </Modal>
    </div>
  );
}

export default Sidebar;
