import "../css/app.css";
import { getAuth, signOut } from "firebase/auth";
import { Navigate } from "react-router";
import Modal, { useModal } from "../components/Modal/Modal";
import { useContext, useEffect } from "react";
import serverListener from "../firebase/serverListener";
import { AuthContext, useAuth } from "../context/AuthContext";
import { ServerForm } from "../components/Modal/ServerForm";
import { ServerList } from "../components/ServerList";
import { CancelButton } from "../components/Buttons/CancelButton";

function Sidebar({
  activeServer,
  setActiveServer,
  setServersDocs,
  serversDocs,
}) {
  const { userData } = useAuth();
  const { isVisible, toggleModal } = useModal();
  const { setLoading } = useContext(AuthContext);

  // useeffect para atualizar os servidores em tempo real
  useEffect(() => {
    serverListener(userData, setServersDocs, setLoading);
  }, [userData, setServersDocs, setLoading]);

  return (
    <div className="sidebar-container">
      <ServerList
        activeServer={activeServer}
        toggleModal={toggleModal}
        serversDocs={serversDocs}
        setActiveServer={setActiveServer}
      />
      <CancelButton
        fitWidth
        centered
        onClick={() => {
          const auth = getAuth();
          signOut(auth)
            .then(() => {
              <Navigate to={"/signin"} replace />;
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        Sair
      </CancelButton>
      <Modal isVisible={isVisible} toggleModal={toggleModal}>
        <ServerForm currentUser={userData} toggleModal={toggleModal} />
      </Modal>
    </div>
  );
}

export default Sidebar;
