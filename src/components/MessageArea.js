const messages = [
  { user: "Fel9", message: "All the ones I typed earlier are vetted" },
  { user: "Joe", message: "That isn’t the case for me" },
  { user: "Fel9", message: "Bothers me how few have apps tbh." },
];

function MessageArea() {
  const message = messages.map((information) => (
    <div className="border-l border-teal-500 px-1">
      <small className="underline">{information.user}</small>
      <p className="text-sm"> {information.message} </p>
    </div>
  ));
  return (
    <div className="flex flex-col h-screen justify-between p-2">
      <main className="space-y-1">{message}</main>
      <form>
        <div className="flex flex-row">
          <input
            className="rounded-l-sm px-2 w-full bg-zinc-700 text-white outline-teal-200 outline-1 transition-all duration-500 ease-in"
            placeholder="Digite a mensagem"
            type={"text"}
          />
          <button
            className="rounded-r-sm bg-teal-500 text-sm px-1"
            type="button"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageArea;
