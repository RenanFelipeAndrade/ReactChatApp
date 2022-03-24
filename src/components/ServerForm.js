import { ServerIcon } from "@heroicons/react/outline";
import React from "react";
import { createServer } from "../firebase/createServer";
import { ButtonGroup } from "./ButtonGroup";
import { CancelButton } from "./Buttons/CancelButton";
import { ConfirmButton } from "./Buttons/ConfirmButton";

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
              <ServerIcon className="intermediate-icon" />
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

            <ButtonGroup>
              <ConfirmButton submit>Confirmar</ConfirmButton>
              <CancelButton onClick={this.props.toggleModal}>
                Cancelar
              </CancelButton>
            </ButtonGroup>
          </div>
        </form>
      </div>
    );
  }
}
