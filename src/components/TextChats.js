import { ChevronDownIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { ChatForm } from "./ChatForm";
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

  const chatName = chats?.map((chat, index) => {
    return (
      <li
        key={index}
        className="text-center "
        onClick={() => setActiveChat({ index: index, ...chat })}
      >
        {chat.name === activeChat.name ? (
          <button className="p-1 bg-zinc-700 text-zinc-300 whitespace-nowrap text-ellipsis text-sm ">
            {chat.name}
          </button>
        ) : (
          <button className="p-1 text-zinc-300 whitespace-nowrap text-ellipsis text-sm hover:text-zinc-100 hover:rounded hover:bg-zinc-800 focus:text-white focus:bg-zinc-700">
            {chat.name}
          </button>
        )}
      </li>
    );
  });

  return (
    <>
      <div className="h-screen w-32 p-2 overflow-hidden">
        {activeServer ? (
          <div className="server-control">
            <header className="mb-2">
              <span className="font-bold text-lg">
                {activeServer.data().serverName}
              </span>

              <button type="button" onClick={toggleDropdown}>
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </header>

            <ServerDropdown
              className="dropdown-container "
              activeServer={activeServer}
              setActiveServer={setActiveServer}
              isActive={isActive}
            />

            <p className="flex flex-row">
              <small>Chats</small>
              <button onClick={toggleModal}>
                <PlusCircleIcon className="w-4 h-4" />
              </button>
            </p>
          </div>
        ) : null}
        <ul className="space-y-2">
          {chatName ? chatName : <small>Sem chats</small>}
        </ul>
      </div>
      <Modal isVisible={isVisible} toggleModal={toggleModal}>
        <ChatForm activeServer={activeServer} toggleModal={toggleModal} />
      </Modal>
    </>
  );
}

export default TextChats;
