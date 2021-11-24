import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_3V2-RyaZyVj9K3tYkqkYI_ZA7OICs_w",
  authDomain: "find-fit-ce6dd.firebaseapp.com",
  projectId: "find-fit-ce6dd",
  storageBucket: "find-fit-ce6dd.appspot.com",
  messagingSenderId: "157930178101",
  appId: "1:157930178101:web:22b8d61871db480888537c",
  measurementId: "G-TKH7R4WTGV"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);