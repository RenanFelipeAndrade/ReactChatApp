import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/init";

export function ConfirmDelete({
  activeServer,
  setActiveServer,
  toggleDeleteModal,
}) {
  async function deleteServer() {
    await deleteDoc(doc(db, "server", activeServer.id)).then(
      setActiveServer(null)
    );
  }
  return (
    <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-col">
      <header> Deseja realmente excluir o servidor ? </header>
      <section className="space-x-1 my-2">
        <button type="button" className="confirm-button" onClick={deleteServer}>
          Deletar
        </button>
        <button
          type="button"
          className="danger-button"
          onClick={toggleDeleteModal}
        >
          Cancelar
        </button>
      </section>
    </div>
  );
}
