import firebase from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5Bf15ajKpXT4BDx2naiZrb8f5vyMvxKw",
  authDomain: "whatsapp2-5fb82.firebaseapp.com",
  projectId: "whatsapp2-5fb82",
  storageBucket: "whatsapp2-5fb82.appspot.com",
  messagingSenderId: "1080364755130",
  appId: "1:1080364755130:web:9cda99e04cecae3b403a83",
};

// Initialize Firebase
const app = !firebase.app.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
