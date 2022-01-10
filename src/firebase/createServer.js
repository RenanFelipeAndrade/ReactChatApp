import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./init";

export default async function createServer(data) {
  try {
    await setDoc(doc(db, "server", data.serverName), {
      user: auth.currentUser.uid,
      serverName: data.serverName,
    });
  } catch (error) {
    console.log(error);
  }
}
