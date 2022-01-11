import "../css/textChats.css";
const chats = [
  "ttools-and-linkstools-and-linksools-and-links",
  "official-links",
  "❓-specific-questions",
];

function TextChats() {
  const chatName = chats.map((name) => (
    <li className="text-center ">
      <button className="text-zinc-300 text-sm hover:text-zinc-100 hover:rounded hover:bg-zinc-800 focus:text-white focus:bg-zinc-700">
        {name}
      </button>
    </li>
  ));

  return (
    <div className="h-screen">
      <ul className="p-2 space-y-2">{chatName}</ul>
    </div>
  );
}

export default TextChats;
