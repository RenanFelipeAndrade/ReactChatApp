import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/init";
import { MessageList } from "../components/MessageList";
import { ChevronDownIcon } from "@heroicons/react/outline";

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

    // retira todos as quebras de linha
    const splitedMessage = data.message.split("\n");
    let emptyBeginningLines = 0;
    for (let index in splitedMessage) {
      // verifica se a linha atual é vazia e se está antes de qualquer conteúdo
      if (splitedMessage[index].length === 0 && emptyBeginningLines == index)
        emptyBeginningLines++;
      index++;
    }

    // retira-se as quebras de linha no início da mensagem e inverte a lista
    const semiCleanMessage = splitedMessage
      .slice(emptyBeginningLines)
      .reverse();

    // repete o mesmo processo pelo lado inverso
    emptyBeginningLines = 0;
    for (let index in semiCleanMessage) {
      if (semiCleanMessage[index].length === 0 && emptyBeginningLines == index)
        emptyBeginningLines++;
      index++;
    }

    // retorna a mensagem sem quebras de linha no início e fim
    const cleanedMessage = semiCleanMessage
      .slice(emptyBeginningLines)
      .reverse()
      .join("\n");

    // por limitações da firebase, reescreve-se todo o array "chats" com as novas mensagens para cada atualização
    chats[activeChat.index].messages.push({
      content: cleanedMessage,
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
      <button
        className="fixed bottom-20 right-5 sm:right-10"
        onClick={scrollDown}
      >
        <ChevronDownIcon className="intermediate-icon bg-zinc-700 rounded " />
      </button>
    </div>
  );
}

export default MessageArea;
