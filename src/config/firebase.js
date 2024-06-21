import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBLnY1_vxIeb36Pop0JMS3Tlh5idLei5Go",
  authDomain: "project-ahc-react.firebaseapp.com",
  projectId: "project-ahc-react",
  storageBucket: "project-ahc-react.appspot.com",
  messagingSenderId: "773218404765",
  appId: "1:773218404765:web:98440418509b32e6db4774",
  measurementId: "G-ES9W7D1Q0C"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();