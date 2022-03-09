import { TrashIcon, PencilIcon, UserAddIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { ConfirmDelete } from "./ConfirmDelete";
import Modal, { useModal } from "./Modal";
import { RenameServerForm } from "./RenameServerForm";

export function useDropdown() {
  const [isActive, setIsVisible] = useState(false);

  function toggleDropdown() {
    setIsVisible(!isActive);
  }
  return { isActive, toggleDropdown };
}

export function ServerDropdown({
  isActive,
  className,
  activeServer,
  setActiveServer,
}) {
  // usado duas vezes para componentes filhos diferentes
  const { isVisible: isDeleteModalVisible, toggleModal: toggleDeleteModal } =
    useModal();
  const { isVisible: isRenameModalVisible, toggleModal: toggleRenameModal } =
    useModal();
  const [copied, setCopied] = useState(false);

  function createInviteLink() {
    navigator.clipboard.writeText(
      `${window.location.href}invite/${activeServer.id}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }

  return (
    <>
      {isActive ? (
        <div className={className}>
          <button
            type="button"
            className="dropdown-button"
            onClick={() => {
              toggleDeleteModal();
            }}
          >
            <TrashIcon className="w-4 h-4 text-rose-500" />
            <span> Deletar </span>
          </button>
          <button
            type="button"
            className="dropdown-button"
            onClick={() => {
              toggleRenameModal();
            }}
          >
            <PencilIcon className="w-4 h-4 text-yellow-500" />
            <span> Renomear </span>
          </button>

          {copied ? (
            <div
              id="copy-confirm"
              className="bg-teal-500 w-full rounded text-center"
            >
              Copiado!
            </div>
          ) : (
            <>
              <button
                type="button"
                className="dropdown-button relative"
                onClick={createInviteLink}
              >
                <UserAddIcon className="w-4 h-4 text-teal-500" />
                <span> Convidar </span>
              </button>
            </>
          )}
        </div>
      ) : null}
      <Modal toggleModal={toggleRenameModal} isVisible={isRenameModalVisible}>
        <RenameServerForm
          activeServer={activeServer}
          toggleRenameModal={toggleRenameModal}
        />
      </Modal>
      <Modal toggleModal={toggleDeleteModal} isVisible={isDeleteModalVisible}>
        <ConfirmDelete
          setActiveServer={setActiveServer}
          activeServer={activeServer}
          toggleDeleteModal={toggleDeleteModal}
        />
      </Modal>
    </>
  );
}
