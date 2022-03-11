import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/init";
import { MessageList } from "./MessageList";

function MessageArea({ activeChat, activeServer, serverDocs, chats }) {
  const { register, handleSubmit, resetField } = useForm();
  const { userData } = useAuth();
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef();

  // useffect para atualizar as mensagens em tempo real
  useEffect(() => {
    if (activeChat) {
      const chat = chats?.find((chat) => chat.name === activeChat.name);
      setMessages(chat?.messages);
    }
  }, [activeChat, serverDocs, chats]);

  async function sendMessage(data) {
    if (!activeChat.name || !data.message) return;
    // por limitações da firebase, reescreve-se todo o array "chats" com as novas mensagens para cada atualização
    chats[activeChat.index].messages.push({
      content: data.message,
      user: userData.displayName,
    });
    try {
      await updateDoc(doc(db, "server", activeServer.id), {
        chats: chats,
      }).then(() => {
        // limpa a textarea e desce até a última mensagem
        resetField("message");
        scrollDown();
      });
    } catch (error) {
      console.log(error);
    }
  }

  function scrollDown() {
    messagesRef.current.lastChild.scrollIntoView();
  }

  return (
    <div className="message-container">
      <header className="selected-chat-indicator">
        Chat: {activeChat.name || "Nenhum selecionado"}
      </header>

      <MessageList
        scrollDown={scrollDown}
        messagesRef={messagesRef}
        messages={messages}
        userData={userData}
        activeChat={activeChat}
      />

      <form
        className="message-input-group"
        onSubmit={handleSubmit(sendMessage)}
      >
        <textarea
          disabled={!activeChat.name}
          className="message-textarea"
          placeholder="Digite a mensagem"
          {...register("message")}
          onKeyDown={(event) => {
            // se o usuário apertar enter, envia a mensagem
            // se o usuário apertar shift+enter, cria-se uma nova linha
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSubmit(sendMessage)();
            }
          }}
        />
        <button className="send-message-button" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default MessageArea;
