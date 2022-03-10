import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/init";

function MessageArea({ activeChat, activeServer, serverDocs, chats }) {
  const { register, handleSubmit } = useForm();
  const { userData } = useAuth();
  const [messages, setMessages] = useState([]);

  // useffect para atualizar as mensagens em tempo real
  useEffect(() => {
    if (activeChat) {
      const chat = chats?.find((chat) => chat.name === activeChat.name);
      setMessages(chat?.messages);
    }
  }, [activeChat, serverDocs, chats]);

  const messageList = messages?.map((message, index) =>
    message.user === userData.displayName ? (
      <li key={index} className="logged-user-message">
        <small className="underline">{message.user}</small>
        <p> {message.content} </p>
      </li>
    ) : (
      <li key={index} className="other-user-message">
        <small className="underline">{message.user}</small>
        <p> {message.content} </p>
      </li>
    )
  );

  async function sendMessage(data) {
    // por limitações da firebase, reescreve-se todo o array "chats" com as novas mensagens para cada atualização
    chats[activeChat.index].messages.push({
      content: data.message,
      user: userData.displayName,
    });
    try {
      await updateDoc(doc(db, "server", activeServer.id), {
        chats: chats,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="message-container">
      <ul>{messageList}</ul>
      <form
        className="flex flex-row justify-self-end"
        onSubmit={handleSubmit(sendMessage)}
      >
        <input
          placeholder="Digite a mensagem"
          type={"text"}
          {...register("message")}
        />
        <button className="rounded-r-sm bg-teal-500 text-sm px-1" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default MessageArea;
