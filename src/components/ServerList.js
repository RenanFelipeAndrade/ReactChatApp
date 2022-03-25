import { PlusIcon } from "@heroicons/react/outline";

export const ServerList = ({
  serversDocs,
  setActiveServer,
  activeServer,
  toggleModal,
}) => {
  return (
    <ul>
      {serversDocs?.map((serverDoc) => (
        <li
          className="text-sm"
          key={serverDoc.id}
          onClick={() => setActiveServer(serverDoc)}
        >
          {serverDoc.id === activeServer?.id ? (
            <button type="button" className="sidebar-item-active">
              {serverDoc.data().serverName}
            </button>
          ) : (
            <button type="button" className="sidebar-item">
              {serverDoc.data().serverName}
            </button>
          )}
        </li>
      ))}
      <li onClick={toggleModal}>
        <button type="button" className="sidebar-item">
          <PlusIcon className="icon" />
        </button>
      </li>
    </ul>
  );
};
