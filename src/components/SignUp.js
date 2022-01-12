import React from "react";
import { Link } from "react-router-dom";
import trySignUp from "../firebase/trySignUp";
import "../firebase/init";

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
    };
    // funções ativadas por eventos
    this.formChangeHandler = this.formChangeHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }

  formSubmitHandler(event) {
    // verifica se senha e confimação são diferentes
    if (this.state.password === this.state.confirmPassword) {
      this.setState({ differentPasswordsError: false });
      // função firebase de cadastro
      trySignUp(this.state);
    }
    event.preventDefault();
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
              className="rounded-sm mb-2 px-2 w-full bg-zinc-700 text-white focus:outline-teal-200 outline-none transition-all duration-150 ease-in-out"
              placeholder="Como será chamado?"
              required
            ></input>

            <label>Email</label>
            <input
              type={"email"}
              onChange={this.formChangeHandler}
              value={this.state.email}
              name="email"
              className="rounded-sm mb-2 px-2 w-full bg-zinc-700 text-white focus:outline-teal-200 outline-none transition-all duration-150 ease-in-out"
              placeholder="Digite o email"
              required
            ></input>

            <label>Senha</label>
            <input
              type={"password"}
              onChange={this.formChangeHandler}
              value={this.state.password}
              name="password"
              className="rounded-sm mb-2 px-2 w-full bg-zinc-700 text-white focus:outline-teal-200 outline-none transition-all duration-150 ease-in-out"
              placeholder="Digite a senha"
              required
            ></input>

            <label>Confirme a senha</label>
            <input
              type={"password"}
              onChange={this.formChangeHandler}
              value={this.state.confirmPassword}
              name="confirmPassword"
              className="rounded-sm px-2 w-full bg-zinc-700 text-white focus:outline-teal-200 outline-none transition-all duration-150 ease-in-out"
              placeholder="Confirme a senha"
              required
            ></input>

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

          <div className="min-w-full mt-2">
            <button
              type="submit"
              className="rounded-sm bg-teal-500 hover:bg-teal-700 transition text-sm py-1 w-full"
            >
              Confirmar
            </button>
          </div>
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
