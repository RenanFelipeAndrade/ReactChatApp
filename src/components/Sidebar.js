import "../css/sidebar.css";
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
  const listServerAsElement = servers.map((img) => (
    <li>
      <img src={img} alt="Logo" className="serverIcon" />
    </li>
  ));
  return (
    <div className="sidebarContainer">
      <ul className="serverList">
        {listServerAsElement}
        <li>
          <svg
            className="serverIcon"
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
    </div>
  );
}

export default Sidebar;
