// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQj6O22enP1lR-bYFF5Gzhk5KvCSzcX0k",
  authDomain: "clubmate-99ce0.firebaseapp.com",
  projectId: "clubmate-99ce0",
  storageBucket: "clubmate-99ce0.firebasestorage.app",
  messagingSenderId: "798465520913",
  appId: "1:798465520913:web:de563c09581035d57748b0",
  measurementId: "G-DM2D53QM1W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

