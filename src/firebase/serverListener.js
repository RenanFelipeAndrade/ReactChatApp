import { db } from "./init";
import { collection, onSnapshot, query, where } from "firebase/firestore";

// função para obter o servidores criados pelo usuário
export default async function serverListener(userData, setServersDocs) {
  const q = query(collection(db, "server"), where("user", "==", userData.uid));
  onSnapshot(q, (querySnapshot) => {
    const servers = [];
    querySnapshot.forEach((doc) => {
      servers.push(doc);
    });
    setServersDocs(servers);
  });
}
