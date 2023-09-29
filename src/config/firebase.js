// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2h3ZwYxD9XNBR69KcN1KfEQSYh2kXc0I",
  authDomain: "vite-contact-fd822.firebaseapp.com",
  projectId: "vite-contact-fd822",
  storageBucket: "vite-contact-fd822.appspot.com",
  messagingSenderId: "691765389296",
  appId: "1:691765389296:web:8e814965706815d78f1f35"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);