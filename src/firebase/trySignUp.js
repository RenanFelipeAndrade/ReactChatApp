import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default async function trySignUp(data) {
  const auth = getAuth();
  let userUpdated = false;
  await createUserWithEmailAndPassword(auth, data.email, data.password).then(
    (user) =>
      updateProfile(user.user, { displayName: data.username }).then(
        (userUpdated = true)
      )
  );
  if (userUpdated) window.location.href = "/login";
}
