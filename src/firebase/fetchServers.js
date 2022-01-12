import { db } from "../firebase/init";
import { collection, getDocs, query, where } from "firebase/firestore";

// função para obter o servidores criados pelo usuário
export default async function fetchServers(currentUser) {
  const q = query(
    collection(db, "server"),
    where("user", "==", currentUser.uid)
  );
  let array = [];

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    array.push(doc.data().serverName);
  });
  return array;
}
