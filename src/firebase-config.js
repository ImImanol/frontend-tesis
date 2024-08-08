// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBwX4GOk-1AaH6NVWsFlV9t17gVDGbc4uM",
  authDomain: "tesis-imagenes.firebaseapp.com",
  projectId: "tesis-imagenes",
  storageBucket: "tesis-imagenes.appspot.com",
  messagingSenderId: "398938224176",
  appId: "1:398938224176:web:bef45105735782f0285ff5",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { storage, firestore, auth };
