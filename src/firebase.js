// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMGpv9ic4y00jThuq8XIahk9j7gBDCj18",
  authDomain: "chatty-2cf93.firebaseapp.com",
  projectId: "chatty-2cf93",
  storageBucket: "chatty-2cf93.appspot.com",
  messagingSenderId: "627934215135",
  appId: "1:627934215135:web:ecc6c94878575ee152a26a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
