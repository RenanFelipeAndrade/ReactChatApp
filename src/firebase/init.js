// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwKR_Le1jaDq02Bu2VUZ9UUHxDyd53ptA",
  authDomain: "chat-app-react-tailwind.firebaseapp.com",
  projectId: "chat-app-react-tailwind",
  storageBucket: "chat-app-react-tailwind.appspot.com",
  messagingSenderId: "402333368108",
  appId: "1:402333368108:web:e2c8153b9282a5e7b8f689",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
