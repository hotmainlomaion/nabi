import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAr_aIk0J5C0HLrd34ISD3nZcW4zqf5ZUI",
  authDomain: "projectnabi.firebaseapp.com",
  projectId: "projectnabi",
  storageBucket: "projectnabi.firebasestorage.app",
  messagingSenderId: "368195062945",
  appId: "1:368195062945:web:c6d8f188af91058aa7f4e0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);