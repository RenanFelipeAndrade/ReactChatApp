import "../css/sidebar.css";
import { getAuth, signOut } from "firebase/auth";
import { Navigate } from "react-router";
import Example, { useModal } from "./Modal";

const img1 =
  "https://cdn.discordapp.com/icons/910210998546366494/6ccc2c37f5cf6a07a1a193f6fc33f551.webp?size=80";
const img2 =
  "https://cdn.discordapp.com/icons/819669388370247732/66cda9201abd37315e19e3662c69ff85.webp?size=80";
const img3 =
  "https://cdn.discordapp.com/icons/910210998546366494/6ccc2c37f5cf6a07a1a193f6fc33f551.webp?size=80";
const img4 =
  "https://cdn.discordapp.com/icons/819669388370247732/66cda9201abd37315e19e3662c69ff85.webp?size=80";
const servers = [img1, img2, img3, img4];

function Sidebar() {
  const { isVisible, toggleModal } = useModal();

  const listServerAsElement = servers.map((img) => (
    <li>
      <img
        src={img}
        alt="Logo"
        className="rounded-lg hover:rounded-3xl transition-all duration-150 ease-in  h-10 w-10"
      />
    </li>
  ));
  return (
    <div className="bg-zinc-700 w-max h-screen flex flex-col">
      <ul className="p-2 space-y-2">
        {listServerAsElement}
        <li onClick={toggleModal}>
          <svg
            className="rounded-lg hover:rounded-3xl transition-all duration-150 ease-in h-10 w-10"
            aria-hidden="false"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"
            ></path>
          </svg>
        </li>
      </ul>
      <div className="mt-auto text-center mb-3">
        <button
          type="button"
          onClick={() => {
            const auth = getAuth();
            signOut(auth)
              .then(() => {
                <Navigate to={"/login"} replace />;
              })
              .catch((error) => {
                console.log(error);
              });
          }}
          className="rounded-sm hover:bg-red-700 transition text-sm py-1 px-2"
        >
          Sair
        </button>
      </div>
      <Example isVisible={isVisible} toggleModal={toggleModal} />
    </div>
  );
}

export default Sidebar;
