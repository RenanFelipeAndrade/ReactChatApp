import React from "react";
import { Link } from "react-router-dom";
import trySignIn from "../firebase/trySignIn";
import { ButtonGroup } from "./ButtonGroup";
import { SubmitButton } from "./Buttons/SubmitButton";

export default class Login extends React.Component {
  constructor() {
    super();
    // informações do usuário, email e senha
    this.state = {
      email: "",
      password: "",
      wrongPasswordError: false,
      emailNotFoundError: false,
    };
    // funções ativadas por eventos
    this.formChangeHandler = this.formChangeHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }

  formSubmitHandler(event) {
    event.preventDefault();
    // função firebase para login
    this.setState({ wrongPasswordError: false });
    trySignIn(this.state).catch((error) => {
      if (error.code === "auth/wrong-password")
        return this.setState({ wrongPasswordError: true });
      if (error.code === "auth/user-not-found")
        return this.setState({ emailNotFoundError: true });
    });
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
          <h1 className="text-3xl">Bem-vindo!</h1>
        </header>

        <form className="p-3 w-max" onSubmit={this.formSubmitHandler}>
          <div className="flex flex-col ">
            <label>Email</label>
            <input
              type={"email"}
              className="rounded-sm mb-2 px-2 w-full bg-zinc-700 text-white focus:outline-teal-200 outline-none transition-all duration-150 ease-in-out"
              onChange={this.formChangeHandler}
              name="email"
              placeholder="Digite o email"
            ></input>
            {this.state.emailNotFoundError && (
              <small className="text-red-500">O email não existe!</small>
            )}

            <label>Senha</label>
            <input
              type={"password"}
              name="password"
              onChange={this.formChangeHandler}
              className="rounded-sm px-2 w-full bg-zinc-700 text-white focus:outline-teal-200 outline-none transition-all duration-150 ease-in-out"
              placeholder="Digite a senha"
            ></input>
            {this.state.wrongPasswordError && (
              <div>
                <small className="text-red-500">A senha está errada</small>
              </div>
            )}
          </div>

          <ButtonGroup>
            <SubmitButton>Confirmar</SubmitButton>
          </ButtonGroup>
          <div className="text-center mt-2">
            <small>
              Novo por aqui?{" "}
              <Link
                to={"/signup"}
                className="text-blue-400 transition-colors hover:text-blue-600 focus:text-blue-600 focus:underline "
                replace
              >
                Crie uma conta.
              </Link>
            </small>
          </div>
        </form>
      </div>
    );
  }
}
