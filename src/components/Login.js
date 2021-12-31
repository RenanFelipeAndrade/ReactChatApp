export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center py-3">
      <section>
        <h1 className="text-3xl">Bem-vindo!</h1>
      </section>
      <form className="py-3 w-fit">
        <div className="flex flex-col ">
          <label>Email</label>
          <input
            type={"email"}
            className="rounded-sm mb-2 px-2 w-full bg-zinc-700 text-white focus:outline-teal-200 outline-none transition-all duration-150 ease-in-out"
            placeholder="Digite o email"
          ></input>
          <label>Senha</label>
          <input
            type={"password"}
            className="rounded-sm px-2 w-full bg-zinc-700 text-white focus:outline-teal-200 outline-none transition-all duration-150 ease-in-out"
            placeholder="Digite a senha"
          ></input>
        </div>

        <div className="min-w-fit space-x-1">
          <button
            type="submit"
            className="rounded-sm bg-teal-500 hover:bg-teal-700 transition text-sm px-1 "
          >
            Confirmar
          </button>
          <button
            type="button"
            className="rounded-sm bg-red-500 hover:bg-red-700 transition text-sm px-1"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
