// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCdYmbBzm85t7b8XDwRXLgPfG86kk7m-IM",
  authDomain: "quanlybanhang-faaa3.firebaseapp.com",
  databaseURL: "https://quanlybanhang-faaa3-default-rtdb.firebaseio.com",
  projectId: "quanlybanhang-faaa3",
  storageBucket: "quanlybanhang-faaa3.appspot.com",
  messagingSenderId: "202315621382",
  appId: "1:202315621382:web:84401b236b01ba7236cf87",
  measurementId: "G-069WB4RGC3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const db = getDatabase(app);
