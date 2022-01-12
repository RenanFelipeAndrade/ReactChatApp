import { doc, setDoc } from "firebase/firestore";
import { db } from "./init";

// cria servidor na Firestore, atrelando o uid do usuário para determinar posse
export default async function createServer(data) {
  try {
    await setDoc(doc(db, "server", data.serverName), {
      user: data.currentUser.uid,
      serverName: data.serverName,
    });
  } catch (error) {
    console.log(error);
  }
}
