import "./init";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
const db = getFirestore();

export default async function trySignUp(data) {
  const auth = getAuth();
  console.log(auth);
  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(
      await setDoc(doc(db, "userInfo", data.username), {
        username: data.username,
      })
    )
    .catch((error) => {
      console.log(error);
    });
}
