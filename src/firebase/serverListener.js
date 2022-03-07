import { db } from "./init";
import { collection, onSnapshot, query, where } from "firebase/firestore";

// função para observar os servidores que o usuário participa
// ela é resposável por atualizar os servidores em tempo real
export default async function serverListener(userData, setServersDocs) {
  const q = query(
    collection(db, "server"),
    where("participantsId", "array-contains", userData.uid)
  );

  onSnapshot(q, (querySnapshot) => {
    const servers = [];
    querySnapshot.forEach((doc) => {
      servers.push(doc);
    });
    setServersDocs(servers);
  });
}
