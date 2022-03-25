import React from "react";
import { Link } from "react-router-dom";
import trySignUp from "../firebase/trySignUp";
import "../firebase/init";
import { ConfirmButton } from "./Buttons/ConfirmButton";
import { ButtonGroup } from "./ButtonGroup";

class SingUp extends React.Component {
  constructor() {
    super();
    // informações do usuário, nome de usuário, email, senha e confirmação de senha
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      differentPasswordsError: false,
      alreadyExistsError: false,
    };
    // funções ativadas por eventos
    this.formChangeHandler = this.formChangeHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }

  formSubmitHandler(event) {
    event.preventDefault();
    // verifica se senha e confimação são diferentes
    if (this.state.password === this.state.confirmPassword) {
      this.setState({ differentPasswordsError: false });
      this.setState({ alreadyExistsError: false });
      // função de cadastro
      trySignUp(this.state).catch((error) => {
        if (error.code === "auth/email-already-in-use")
          this.setState({ alreadyExistsError: true });
      });

      return;
    }
    // se são difentes, renderiza mensagem de erro
    this.setState({ differentPasswordsError: true });
  }

  formChangeHandler(event) {
    // atualiza o state ao inserir informações nos inputs
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <div className="flex flex-col h-screen justify-center items-center p-3">
        <header>
          <h1 className="text-3xl">Olá visitante!</h1>
        </header>

        <form className="p-3 w-fit" onSubmit={this.formSubmitHandler}>
          <div className="flex flex-col ">
            <label>Usuário</label>
            <input
              type={"text"}
              onChange={this.formChangeHandler}
              value={this.state.username}
              name="username"
              placeholder="Como será chamado?"
              required
            />

            <label>Email</label>
            <input
              type={"email"}
              onChange={this.formChangeHandler}
              value={this.state.email}
              name="email"
              placeholder="Digite o email"
              required
            />
            {this.state.alreadyExistsError && (
              <small className="text-red-500">O email já existe!</small>
            )}

            <label>Senha</label>
            <input
              type={"password"}
              onChange={this.formChangeHandler}
              value={this.state.password}
              name="password"
              placeholder="Digite a senha"
              required
            />

            <label>Confirme a senha</label>
            <input
              type={"password"}
              onChange={this.formChangeHandler}
              value={this.state.confirmPassword}
              name="confirmPassword"
              placeholder="Confirme a senha"
              required
            />

            {/* mensagem de erro */}
            {this.state.differentPasswordsError ? (
              <div>
                <small className="text-red-500">
                  A senha e a confirmação estão diferentes!
                </small>
              </div>
            ) : (
              ""
            )}
          </div>

          <ButtonGroup>
            <ConfirmButton submit>Confirmar</ConfirmButton>
          </ButtonGroup>
          <div className="mt-2">
            <small>
              Tem uma conta? Faça login{" "}
              <Link
                to={"/login"}
                className="text-blue-400 transition-colors hover:text-blue-600 focus:text-blue-600 focus:underline "
                replace
              >
                clicando aqui
              </Link>
            </small>
          </div>
        </form>
      </div>
    );
  }
}

export default SingUp;
