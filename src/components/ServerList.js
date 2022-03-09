export const ServerList = ({ serversDocs, setActiveServer, activeServer }) => {
  return serversDocs?.map((serverDoc) => (
    <li
      className="text-sm"
      key={serverDoc.id}
      onClick={() => setActiveServer(serverDoc)}
    >
      {serverDoc.id === activeServer?.id ? (
        <button
          type="button"
          className=" bg-zinc-600 transition w-full p-1 rounded break-all"
        >
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
