import { getAuth, signOut } from "firebase/auth";
import { Navigate } from "react-router";
import Modal, { useModal } from "./Modal";
import { useEffect, useState } from "react";
import fetchServers from "../firebase/fetchServers";
import { useAuth } from "../context/AuthContext";
import { ModalForm } from "./ModalForm";

function Sidebar({ activeServer, setActiveServer }) {
  // hooks
  const [serversDocs, setServersDocs] = useState([]);
  const { userData } = useAuth();
  const { isVisible, toggleModal } = useModal();

  // effects
  useEffect(() => {
    fetchServers(userData).then((serversDocs) => setServersDocs(serversDocs));
  }, [userData]);

  // manipulação de informação
  const listServerAsElement = serversDocs.map((serverDoc) => (
    <li
      className="text-sm"
      key={serverDoc.id}
      onClick={() => setActiveServer(serverDoc)}
    >
      {serverDoc.id === activeServer?.id ? (
        <button
          type="button"
          className=" bg-zinc-600 transition w-full p-1 rounded break-all"
        >
          {serverDoc.data().serverName}
        </button>
      ) : (
        <button
          type="button"
          className="transition w-full hover:bg-zinc-600 p-1 rounded break-all"
        >
          {serverDoc.data().serverName}
        </button>
      )}
    </li>
  ));

  return (
    <div className="bg-zinc-700 w-fit h-screen flex flex-col">
      <ul className="p-2 space-y-2 w-min">
        {listServerAsElement}
        <li onClick={toggleModal}>
          <svg
            className="rounded-lg hover:rounded-3xl transition-all duration-150 ease-in h-10 w-10"
            aria-hidden="false"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"
            ></path>
          </svg>
        </li>
      </ul>
      <div className="mt-auto text-center mb-3">
        <button
          type="button"
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
          className="rounded-sm hover:bg-red-700 transition text-sm py-1 px-2"
        >
          Sair
        </button>
      </div>
      <Modal isVisible={isVisible} toggleModal={toggleModal}>
        <ModalForm currentUser={userData} toggleModal={toggleModal} />
      </Modal>
    </div>
  );
}

export default Sidebar;
