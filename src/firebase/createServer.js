import { addDoc, collection } from "firebase/firestore";
import { db } from "./init";

// cria servidor na Firestore, atrelando o uid do usuário para determinar posse
export async function createServer(data) {
  try {
    await addDoc(collection(db, "server"), {
      owner: {
        uid: data.currentUser.uid,
        displayName: data.currentUser.displayName,
      },
      serverName: data.serverName,
      participantsId: [data.currentUser.uid],
      participantsObject: [
        {
          uid: data.currentUser.uid,
          displayName: data.currentUser.displayName,
        },
      ],
      chats: [],
    });
  } catch (error) {
    console.log(error);
  }
}
