import { ServerIcon } from "@heroicons/react/outline";
import { doc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { db } from "../firebase/init";

export function RenameServerForm({ toggleRenameModal, activeServer }) {
  const { register, handleSubmit } = useForm();

  async function renameServer(data) {
    await updateDoc(doc(db, "server", activeServer.id), {
      serverName: data.serverName,
    });
  }
  return (
    <form
      className="px-4 py-3 sm:px-6 sm:flex sm:flex-col"
      onSubmit={handleSubmit(renameServer)}
    >
      <header className="flex flex-row items-center gap-1">
        <span className="text-lg">
          Renomeie o <b>{activeServer.data().serverName}</b>
        </span>
        <ServerIcon className="w-4 h-4" />
      </header>
      <div>
        <label> Nome do servidor </label>
        <input type="text" className="text-black" {...register("serverName")} />
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
