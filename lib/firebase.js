import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCcDQOiT6PqbMIWZ8n5cxn61rc1mEgpDgo",
  authDomain: "inpetu-maker.firebaseapp.com",
  projectId: "inpetu-maker",
  storageBucket: "inpetu-maker.firebasestorage.app",
  messagingSenderId: "78217583489",
  appId: "1:78217583489:web:ba5e33f7b1dcbce5fbe680"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);