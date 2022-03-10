import { TrashIcon } from "@heroicons/react/outline";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/init";

export const ChatList = ({
  chats,
  setActiveChat,
  activeChat,
  activeServer,
}) => {
  async function deleteChat() {
    try {
      await updateDoc(doc(db, "server", activeServer.id), {
        chats: arrayRemove({
          name: activeChat.name,
          messages: activeChat.messages,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ul className="chat-list">
      {chats.map((chat, index) => (
        <li key={index}>
          {chat.name === activeChat.name ? (
            // quando o chat for o ativo
            <button
              onClick={() => setActiveChat({ index: index, ...chat })}
              className="chat-button chat-active"
            >
              <span className="chat-name">{chat.name}</span>
              {/* cria um botão de excluir chat */}

              <span className="group" onClick={deleteChat}>
                <TrashIcon className="w-4 h-4" />
                {/* aparece quando der hover no ícone de lixeira */}
                <small className="absolute transition-all bg-zinc-800 -top-5 rounded shadow px-1 right-0 hidden group-hover:block">
                  Remover Chat
                </small>
              </span>
            </button>
          ) : (
            // quando o chat não for ativo
            <button
              onClick={() => setActiveChat({ index: index, ...chat })}
              className="chat-button"
            >
              <span className="chat-name">{chat.name}</span>
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};
