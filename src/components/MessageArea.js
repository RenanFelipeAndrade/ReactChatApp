import { doc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/init";

function MessageArea({ activeChat, activeServer }) {
  const { register, handleSubmit } = useForm();
  const { userData } = useAuth();
  const messages = activeChat?.messages;

  const message = messages?.map((message, index) => (
    <div key={index} className="border-l border-teal-500 px-1">
      <small className="underline">{message.user}</small>
      <p className="text-sm"> {message.content} </p>
    </div>
  ));

  async function sendMessage(data) {
    // por limitações da firebase, reescreve-se todo o array "chats" com as novas mensagens para cada atualização
    const chats = activeServer.data().chats;
    chats[activeChat.index].messages.push({
      content: data.message,
      user: userData.uid,
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
    <div className="flex flex-col h-screen w-full justify-between p-2">
      <main className="space-y-1">{message}</main>
      <form onSubmit={handleSubmit(sendMessage)}>
        <div className="flex flex-row">
          <input
            className="rounded-l-sm px-2 w-full bg-zinc-700 text-white outline-teal-200 outline-1 transition-all duration-500 ease-in"
            placeholder="Digite a mensagem"
            type={"text"}
            {...register("message")}
          />
          <button
            className="rounded-r-sm bg-teal-500 text-sm px-1"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageArea;
