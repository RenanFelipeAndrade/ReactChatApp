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
          <div className="modal-container">
            <div className="modal-title">
              <ServerIcon className="w-5 h-5" />
              <span>Adicionar servidor</span>
            </div>

            <label>Nome do servidor</label>
            <input
              type={"text"}
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
