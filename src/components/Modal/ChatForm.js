import { ChatIcon } from "@heroicons/react/outline";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { db } from "../../firebase/init";
import { ButtonGroup } from "../ButtonGroup";
import { ConfirmButton } from "../Buttons/ConfirmButton";
import { CancelButton } from "../Buttons/CancelButton";

export const ChatForm = ({ toggleModal, activeServer }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  async function createChat(data) {
    if (!data.chatName) return setError("chatName");
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
        <div className="modal-container">
          <header className="modal-title">
            <ChatIcon className="intermediate-icon" />
            <span>Adicionar um chat</span>
          </header>
          <label htmlFor="chatName">Nome do chat</label>
          <input
            type="text"
            id="chatName"
            {...register("chatName")}
            placeholder="Digite um nome ao chat"
          />
          {errors.chatName && (
            <div>
              <small className="text-red-300">Digite um nome!</small>
            </div>
          )}
          <ButtonGroup>
            <ConfirmButton submit="true">Confirmar</ConfirmButton>
            <CancelButton onClick={toggleModal}>Cancelar</CancelButton>
          </ButtonGroup>
        </div>
      </form>
    </>
  );
};
