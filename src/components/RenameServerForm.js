import { ServerIcon } from "@heroicons/react/outline";
import { doc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { db } from "../firebase/init";

export function RenameServerForm({ toggleRenameModal, activeServer }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  async function renameServer(data) {
    if (!data.serverName) return setError("chatName");
    await updateDoc(doc(db, "server", activeServer.id), {
      serverName: data.serverName,
    });
  }
  return (
    <form
      className="px-4 py-3 sm:px-6 sm:flex sm:flex-col"
      onSubmit={handleSubmit(renameServer)}
    >
      <header className="modal-title">
        <ServerIcon className="intermediate-icon" />
        <span>
          Renomeie o <b>{activeServer.data().serverName}</b>
        </span>
      </header>
      <div>
        <label> Nome do servidor </label>
        <input
          type="text"
          placeholder="Digite o nome do servidor"
          {...register("serverName")}
        />
        {errors.chatName && (
          <div>
            <small className="text-red-300">Digite um nome!</small>
          </div>
        )}
      </div>
      <section className="space-x-1 my-2">
        <button type="submit" className="confirm-button">
          Renomear
        </button>
        <button
          type="button"
          className="danger-button"
          onClick={toggleRenameModal}
        >
          Cancelar
        </button>
      </section>
    </form>
  );
}
