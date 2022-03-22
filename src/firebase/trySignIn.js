import "./init";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./init";

export default async function trySignIn(data) {
  await signInWithEmailAndPassword(auth, data.email, data.password).then(() =>
    window.location.replace("/")
  );
}
