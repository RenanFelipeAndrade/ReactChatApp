import { useEffect, useState } from "react";

export const MessageList = ({
  messages,
  userData,
  activeChat,
  messagesRef,
  scrollDown,
}) => {
  const [doneOnce, setDoneOnce] = useState(false);

  useEffect(() => {
    // caso seja a primeira vez renderizando a lista de mensagens, desça até a última
    if (!doneOnce && messagesRef.current.lastChild) {
      scrollDown();
      setDoneOnce(true);
    }
  }, [doneOnce, scrollDown, messagesRef, messages]);

  // ao trocar de chat, retorna o estado ao original
  useEffect(() => {
    setDoneOnce(false);
  }, [activeChat]);

  return (
    <ul ref={messagesRef}>
      {messages?.map((message, index) =>
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
      )}
    </ul>
  );
};
