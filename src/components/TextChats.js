import { PlusCircleIcon } from "@heroicons/react/outline";
import { ChatForm } from "./ChatForm";
import Modal, { useModal } from "./Modal";

function TextChats({ activeServer, setActiveChat }) {
  const { isVisible, toggleModal } = useModal();
  const chats = activeServer?.data().chats;

  const chatName = chats?.map((chat, index) => (
    <li
      className="text-center "
      onClick={() => setActiveChat({ index: index, ...chat })}
    >
      <button className="p-1 text-zinc-300 whitespace-nowrap text-ellipsis text-sm hover:text-zinc-100 hover:rounded hover:bg-zinc-800 focus:text-white focus:bg-zinc-700">
        {chat.name}
      </button>
    </li>
  ));

  return (
    <>
      <div className="h-screen w-min p-2 overflow-hidden">
        <header className="flex flex-row">
          <span>Chats</span>
          <button onClick={toggleModal}>
            <PlusCircleIcon className="w-4 h-4" />
          </button>
        </header>
        <ul className="p-2 space-y-2">{chatName ? chatName : "Sem chats"}</ul>
      </div>
      <Modal isVisible={isVisible} toggleModal={toggleModal}>
        <ChatForm activeServer={activeServer} toggleModal={toggleModal} />
      </Modal>
    </>
  );
}

export default TextChats;
