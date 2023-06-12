
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {Firestore, getFirestore} from "firebase/firestore"
//import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyB6aA4QaVXctSewc--B64gugXBnWHAKSxI",
  authDomain: "fir-243e7.firebaseapp.com",
  projectId: "fir-243e7",
  storageBucket: "fir-243e7.appspot.com",
  messagingSenderId: "159039163683",
  appId: "1:159039163683:web:fd7c59a313f733a68d9096",
  measurementId: "G-91CB0KQZJR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();
//const analytics = getAnalytics(app);
export const db=getFirestore(app);