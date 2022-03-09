import { ServerIcon } from "@heroicons/react/outline";
import React from "react";
import { createServer } from "../firebase/createServer";

export class ServerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serverName: "",
      currentUser: this.props.currentUser,
      serverNameError: false,
    };
    this.formChangeHandler = this.formChangeHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }
  formChangeHandler(event) {
    this.setState({ serverName: event.target.value });
  }
  formSubmitHandler(event) {
    event.preventDefault();
    if (this.state.serverName === "")
      return this.setState({ serverNameError: true });
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
              className="w-full px-1  text-white rounded-sm outline-none bg-zinc-700 focus:outline-teal-200 transition-all duration-150 ease-in-out"
              name="serverName"
              value={this.serverName}
              onChange={this.formChangeHandler}
              placeholder="Digite o nome do servidor"
            ></input>
            {this.state.serverNameError && (
              <div>
                <small className="text-red-300">Digite um nome!</small>
              </div>
            )}

            <div className="min-w-full space-x-1 mt-2 ">
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
