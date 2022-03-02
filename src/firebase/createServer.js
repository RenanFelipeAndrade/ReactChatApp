import { addDoc, collection } from "firebase/firestore";
import { db } from "./init";

// cria servidor na Firestore, atrelando o uid do usuário para determinar posse
export async function createServer(data) {
  try {
    await addDoc(collection(db, "server"), {
      user: data.currentUser.uid,
      serverName: data.serverName,
    });
  } catch (error) {
    console.log(error);
  }
}
