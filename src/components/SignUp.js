import React from "react";
import { Link } from "react-router-dom";
import trySignUp from "../firebase/trySignUp";
import "../firebase/init";

class SingUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      differentPasswordsError: false,
    };
    this.formChangeHandler = this.formChangeHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }
  formSubmitHandler(event) {
    if (this.state.password === this.state.confirmPassword) {
      trySignUp(this.state);
    } else {
      event.preventDefault();
      this.setState({ differentPasswordsError: true });
      console.log("deu não fi");
    }
  }

  formChangeHandler(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <div className="flex flex-col justify-center items-center py-3">
        <header>
          <h1 className="text-3xl">Olá visitante!</h1>
        </header>
        <form className="py-3 w-fit" onSubmit={this.formSubmitHandler}>
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

          <div className="min-w-fit space-x-1">
            <button
              type="submit"
              className="rounded-sm bg-teal-500 hover:bg-teal-700 transition text-sm px-1 "
            >
              Confirmar
            </button>
            <Link to={"/"}>
              <button
                type="button"
                className="rounded-sm bg-red-500 hover:bg-red-700 transition text-sm px-1"
              >
                Cancelar
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SingUp;
