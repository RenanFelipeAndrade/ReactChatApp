import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ServerIcon } from "@heroicons/react/outline";
import createServer from "../firebase/createServer";
import { createPortal } from "react-dom";

export function useModal() {
  const [isVisible, setIsVisible] = useState(true);

  function toggleModal() {
    setIsVisible(!isVisible);
  }
  return {
    isVisible,
    toggleModal,
  };
}

class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { serverName: "", currentUser: this.props.currentUser };
    this.formChangeHandler = this.formChangeHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }
  formChangeHandler(event) {
    this.setState({ serverName: event.target.value });
  }
  formSubmitHandler(event) {
    event.preventDefault();
    createServer(this.state);
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.formSubmitHandler}
          className="overflow-hidden text-left rounded-lg shadow-xl sm:min-w-full bg-zinc-800 transform transition-all"
        >
          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-col ">
            <div className="flex flex-row items-center justify-center mb-3 grow sm:mb-0 space-x-1">
              <ServerIcon className="w-5 h-5" />
              <h2 className="text-xl">Adicionar servidor</h2>
            </div>

            <label className="">Nome do servidor</label>
            <input
              type={"text"}
              className="w-full px-1 my-2 text-white rounded-sm outline-none bg-zinc-700 focus:outline-teal-200 transition-all duration-150 ease-in-out"
              name="serverName"
              value={this.serverName}
              onChange={this.formChangeHandler}
              placeholder="Digite o nome do servidor"
            ></input>

            <div className="min-w-full space-x-1 ">
              <button
                type="submit"
                className="px-2 py-1 text-sm bg-teal-500 rounded-sm hover:bg-teal-700 transition w-fit"
              >
                Confirmar
              </button>
              <button
                onClick={this.props.toggleModal}
                type="button"
                className="px-2 py-1 text-sm bg-red-500 rounded-sm hover:bg-red-700 transition w-fit"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// TODO criar um contexto para o currentUser
export default function Modal({ isVisible, toggleModal, children }) {
  // modal que aparece ao clicar no + do sidebar
  const cancelButtonRef = useRef(null);
  const div = document.createElement("div");

  return createPortal(
    <Transition.Root show={isVisible} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={toggleModal}
      >
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:flex sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-opacity"></Dialog.Overlay>
          </Transition.Child>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="overflow-hidden text-left rounded-lg shadow-xl sm:min-w-full bg-zinc-800 transform transition-all">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>,
    div
  );
}
