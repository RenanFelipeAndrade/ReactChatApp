import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./init";

export default async function trySignUp(data) {
  const auth = getAuth();
  try {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(
        await setDoc(doc(db, "userInfo", data.username), {
          username: data.username,
        })
      )
      .catch((error) => {
        console.log(error.message);
      });
  } catch (error) {
    console.log(error);
  }
}
