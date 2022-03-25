import React from "react";
import { Link } from "react-router-dom";
import trySignIn from "../firebase/trySignIn";
import { ButtonGroup } from "./ButtonGroup";
import { ConfirmButton } from "./Buttons/ConfirmButton";

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
              onChange={this.formChangeHandler}
              name="email"
              placeholder="Digite o email"
            />
            {this.state.emailNotFoundError && (
              <small className="text-red-500">O email não existe!</small>
            )}

            <label>Senha</label>
            <input
              type={"password"}
              name="password"
              onChange={this.formChangeHandler}
              placeholder="Digite a senha"
            />
            {this.state.wrongPasswordError && (
              <div>
                <small className="text-red-500">A senha está errada</small>
              </div>
            )}
          </div>

          <ButtonGroup>
            <ConfirmButton submit>Confirmar</ConfirmButton>
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
