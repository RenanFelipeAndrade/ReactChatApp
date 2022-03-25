import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Div100vh from "react-div-100vh";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/init";
import { CancelButton } from "./Buttons/CancelButton";
import { ConfirmButton } from "./Buttons/ConfirmButton";
import { ButtonGroup } from "./ButtonGroup";

export function Invite() {
  const [server, setServer] = useState(null);
  const navigate = useNavigate();
  const { userData } = useAuth();
  const params = useParams(); // obtém o id do servidor através da url

  useEffect(() => {
    // obtém as informações do servidor da ocasião
    getDoc(doc(db, "server", params.server)).then((doc) => setServer(doc));
  }, [setServer, params.server]);

  const numberOfParticipants = server?.data().participantsId.length;
  const participantsList = server
    ?.data()
    .participantsObject.map((participant) => (
      <li key={participant.uid}>{participant.displayName}</li>
    ));

  return (
    <Div100vh className="invite-container">
      <header className="invite-header">
        <span>Você foi convidado a participar de </span>
        <b className="underline">{server?.data().serverName}</b>
      </header>
      <ul>
        <h4>Participantes ({numberOfParticipants}):</h4>
        {participantsList}
      </ul>
      <ButtonGroup>
        <ConfirmButton
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
        </ConfirmButton>
        <CancelButton onClick={() => navigate("/", { replace: true })}>
          Cancelar
        </CancelButton>
      </ButtonGroup>
    </Div100vh>
  );
}
