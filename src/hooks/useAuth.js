// import { useEffect, useState } from "react";
import { useState } from "react";
import { auth } from "../firebase/init";

// hook que retorna o usuário logado
// para mais informações sobre o objeto currentUser
// acesse: https://firebase.google.com/docs/reference/js/v8/firebase.User

export default function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     setCurrentUser(user);
  //   });
  // }, []);
  auth.onAuthStateChanged((user) => {
    setCurrentUser(user);
    return;
  });
  return currentUser;
}
