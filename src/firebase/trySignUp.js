import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default async function trySignUp(data) {
  const auth = getAuth();
  let userUpdated = false;
  try {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((user) =>
        updateProfile(user.user, { displayName: data.username }).then(
          (userUpdated = true)
        )
      )
      .catch((error) => {
        console.log(error.message);
      });
  } catch (error) {
    console.log(error);
  }
  if (userUpdated) window.location.href = "/login";
}
