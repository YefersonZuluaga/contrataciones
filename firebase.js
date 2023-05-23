// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, } from "firebase/storage";
const { VITE_URL_APIKEY } = import.meta.env;


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: VITE_URL_APIKEY,
  apiKey: 'AIzaSyCESrJWBn0YjtYKQAGxQ5spsw3YLSSXgAY',
  // authDomain: "http://localhost:5173/",
  authDomain: "contrataci0nes.firebaseapp.com",
  projectId: "contrataci0nes",
  storageBucket: "contrataci0nes.appspot.com",
  messagingSenderId: "774579828521",
  appId: "1:774579828521:web:1fb85e44390a38b2dae938"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app)

export { auth, db, storage };

