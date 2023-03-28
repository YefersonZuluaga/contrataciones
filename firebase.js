// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYUhPiw56Pw0EdBBcbAwS2y513OrbWSdY",
  authDomain: "contrataciones-sas.firebaseapp.com",
  projectId: "contrataciones-sas",
  storageBucket: "contrataciones-sas.appspot.com",
  messagingSenderId: "851067453197",
  appId: "1:851067453197:web:6c7f85d109518cadeafa44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth =  getAuth(app)

export {db ,auth}
