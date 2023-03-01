// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0MD3NbPyauAq3z6T24vs9qvOhSWbo0Mg",
  authDomain: "todo-4c6a8.firebaseapp.com",
  projectId: "todo-4c6a8",
  storageBucket: "todo-4c6a8.appspot.com",
  messagingSenderId: "358354118999",
  appId: "1:358354118999:web:9ab4ff5be18d647802b612",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
