import { PlusCircleIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { ChatForm } from "./ChatForm";
import Modal, { useModal } from "./Modal";

function TextChats({ activeServer }) {
  const { chats, setChats } = useState();
  const { isVisible, toggleModal } = useModal();
  const chatName = chats?.map((name) => (
    <li className="text-center ">
      <button className="text-zinc-300 whitespace-nowrap text-ellipsis text-sm hover:text-zinc-100 hover:rounded hover:bg-zinc-800 focus:text-white focus:bg-zinc-700">
        {name}
      </button>
    </li>
  ));

  return (
    <>
      <div className="h-screen w-min overflow-hidden">
        <header>
          <span>Chats</span>
          <button onClick={toggleModal}>
            <PlusCircleIcon className="w-4 h-4" />
          </button>
        </header>
        <ul className="p-2 space-y-2">{chatName ? chatName : "Sem chats"}</ul>
      </div>
      <Modal isVisible={isVisible} toggleModal={toggleModal}>
        <ChatForm toggleModal={toggleModal} />
      </Modal>
    </>
  );
}

export default TextChats;
