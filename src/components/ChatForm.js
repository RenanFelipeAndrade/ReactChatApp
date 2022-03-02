import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { db } from "../firebase/init";

export const ChatForm = ({ toggleModal, activeServer }) => {
  const { register, handleSubmit } = useForm();
  async function createChat(data) {
    try {
      await updateDoc(doc(db, "server", activeServer.id), {
        chats: arrayUnion({ name: data.chatName, messages: [] }),
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(createChat)}>
        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-col">
          <label htmlFor="chatName">Nome do chat</label>
          <input
            type="text"
            name="chatName"
            id="chatName"
            className="text-black"
            {...register("chatName")}
          />
          <div className="min-w-full space-x-1 mt-2">
            <button
              type="submit"
              className="px-2 py-1 text-sm bg-teal-500 rounded-sm hover:bg-teal-700 transition w-fit"
            >
              Confirmar
            </button>
            <button
              onClick={toggleModal}
              type="button"
              className="px-2 py-1 text-sm bg-red-500 rounded-sm hover:bg-red-700 transition w-fit"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
