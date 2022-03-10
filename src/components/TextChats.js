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
      <div className="chat-container">
        {activeServer ? (
          <div className="server-control">
            <header className="server-control-header">
              <span className="server-control-title">
                {activeServer.data().serverName}
              </span>

              <button type="button" onClick={toggleDropdown}>
                <ChevronDownIcon className="small-icon" />
              </button>
            </header>

            <ServerDropdown
              className="dropdown-container"
              activeServer={activeServer}
              setActiveServer={setActiveServer}
              isActive={isActive}
            />

            <section className="add-chat-section">
              <span>Chats</span>
              <button onClick={toggleModal}>
                <PlusCircleIcon className="small-icon" />
              </button>
            </section>
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
