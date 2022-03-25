import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/init";
import { ButtonGroup } from "../ButtonGroup";
import { CancelButton } from "../Buttons/CancelButton";
import { ConfirmButton } from "../Buttons/ConfirmButton";

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
      <ButtonGroup>
        <ConfirmButton onClick={deleteServer}>Deletar</ConfirmButton>
        <CancelButton onClick={toggleDeleteModal}>Cancelar</CancelButton>
      </ButtonGroup>
    </div>
  );
}
