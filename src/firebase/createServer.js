import { addDoc, collection } from "firebase/firestore";
import { db } from "./init";

// cria servidor na Firestore, atrelando o uid do usuário para determinar posse
export async function createServer(data) {
  try {
    await addDoc(collection(db, "server"), {
      owner: data.currentUser.uid,
      serverName: data.serverName,
      participants: [],
      chats: [],
    });
  } catch (error) {
    console.log(error);
  }
}
