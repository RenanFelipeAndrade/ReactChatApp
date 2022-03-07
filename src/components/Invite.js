import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/init";

export function Invite() {
  const [server, setServer] = useState(null);
  const navigate = useNavigate();
  const { userData } = useAuth();
  const params = useParams(); // obtém o id do servidor através da url

  useEffect(() => {
    // obtém as informações do servidor da ocasião
    getDoc(doc(db, "server", params.server)).then((doc) => setServer(doc));
  }, [setServer, params.server]);

  const participantsList = server
    ?.data()
    .participantsObject.map((participant) => (
      <li key={participant.uid}>{participant.displayName}</li>
    ));

  return (
    <div>
      <header>
        <h2>
          Você foi convidado a participar de <b>{server?.data().serverName}</b>
        </h2>
      </header>
      <main>
        <div>
          <h4>
            Dono do servidor: <b>{server?.data().owner.displayName}</b>
          </h4>
        </div>

        <h4>Participantes:</h4>
        <ul>{participantsList}</ul>
      </main>
      <section className="min-w-full space-x-1 text-center mt-2">
        <button
          type="button"
          className="px-2 py-1 text-sm bg-teal-500 rounded-sm hover:bg-teal-700 transition w-fit"
          onClick={() => {
            // adiciona o usuário atual aos participantes
            updateDoc(doc(db, "server", server.id), {
              participantsId: arrayUnion(userData.uid),
              participantsObject: arrayUnion({
                uid: userData.uid,
                displayName: userData.displayName,
              }),
            }).then(() => navigate("/", { replace: true }));
          }}
        >
          Entrar
        </button>
        <button
          type="button"
          className="px-2 py-1 text-sm bg-red-500 rounded-sm hover:bg-red-700 transition w-fit"
          onClick={() => navigate("/", { replace: true })}
        >
          Cancelar
        </button>
      </section>
    </div>
  );
}
