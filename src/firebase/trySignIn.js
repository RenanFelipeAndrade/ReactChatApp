import "./init";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./init";

export default async function trySignIn(data) {
  await signInWithEmailAndPassword(auth, data.email, data.password)
    // .then((userCredential) => {
    //   console.log(userCredential.user.uid);
    // })
    .catch((error) => {
      console.log(error);
    });
  window.location.replace("/");
}
