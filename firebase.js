// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN9NWXFJ6QcG2IN4NKXnqf0zs6yQXhKV0",
  authDomain: "pantry-tracker-f2f8a.firebaseapp.com",
  projectId: "pantry-tracker-f2f8a",
  storageBucket: "pantry-tracker-f2f8a.appspot.com",
  messagingSenderId: "661972797321",
  appId: "1:661972797321:web:1698a4aff8fdb421ae4358",
  measurementId: "G-BT2XJWQ1QC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firestore = getFirestore(app);

export {firestore}