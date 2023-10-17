import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDBCNyMvAHeK6pNfCothWb_BKXkTD0LRFQ",
  authDomain: "fir-first-project-2a2c7.firebaseapp.com",
  projectId: "fir-first-project-2a2c7",
  storageBucket: "fir-first-project-2a2c7.appspot.com",
  messagingSenderId: "605067808644",
  appId: "1:605067808644:web:abfe9c027e183905b217d1",
  measurementId: "G-WB8EN7ZQNM",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const facebookAuthProvider = new FacebookAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
