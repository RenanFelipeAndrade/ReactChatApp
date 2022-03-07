import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default async function trySignUp(data) {
  const auth = getAuth();
  try {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => updateProfile(user.user, { displayName: data.username }))
      .catch((error) => {
        console.log(error.message);
      });
  } catch (error) {
    console.log(error);
  }
}
