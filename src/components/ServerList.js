export const ServerList = ({ serversDocs, setActiveServer, activeServer }) => {
  return serversDocs?.map((serverDoc) => (
    <li
      className="text-sm"
      key={serverDoc.id}
      onClick={() => setActiveServer(serverDoc)}
    >
      {serverDoc.id === activeServer?.id ? (
        <button type="button" className="sidebar-item-active ">
          {serverDoc.data().serverName}
        </button>
      ) : (
        <button type="button" className="sidebar-item">
          {serverDoc.data().serverName}
        </button>
      )}
    </li>
  ));
};
