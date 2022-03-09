import { ChevronDownIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { ChatForm } from "./ChatForm";
import { ChatList } from "./ChatList";
import Modal, { useModal } from "./Modal";
import { ServerDropdown, useDropdown } from "./ServerDropdown";

function TextChats({
  activeServer,
  setActiveChat,
  setActiveServer,
  serversDocs,
  activeChat,
  chats,
  setChats,
}) {
  const { isActive, toggleDropdown } = useDropdown();
  const { isVisible, toggleModal } = useModal();

  // useEffect para atualizar o componente quando houver alteração nos servidores e no servidor ativo
  useEffect(() => {
    if (activeServer) {
      const server = serversDocs.find(
        (server) => server.id === activeServer.id
      );
      setActiveServer(server);
      setChats(server.data().chats);
    }
  }, [activeServer, setActiveServer, serversDocs, setChats]);

  return (
    <>
      <div className="h-screen w-32 p-2 overflow-hidden">
        {activeServer ? (
          <div className="server-control">
            <header className="mb-2 border-b-2 flex flex-row justify-between">
              <span className="font-bold text-lg">
                {activeServer.data().serverName}
              </span>

              <button type="button" onClick={toggleDropdown}>
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </header>

            <ServerDropdown
              className="dropdown-container"
              activeServer={activeServer}
              setActiveServer={setActiveServer}
              isActive={isActive}
            />

            <p className="flex flex-row mb-3 justify-between">
              <span>Chats</span>
              <button onClick={toggleModal}>
                <PlusCircleIcon className="w-4 h-4" />
              </button>
            </p>
          </div>
        ) : null}
        <ChatList
          activeChat={activeChat}
          chats={chats}
          activeServer={activeServer}
          setActiveChat={setActiveChat}
        />
      </div>
      <Modal isVisible={isVisible} toggleModal={toggleModal}>
        <ChatForm activeServer={activeServer} toggleModal={toggleModal} />
      </Modal>
    </>
  );
}

export default TextChats;
