// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { FacebookAuthProvider, getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGRTc2mZAbIWEpK9bH07U7V1HTDtGD71o",
  authDomain: "login-authentication-415dd.firebaseapp.com",
  projectId: "login-authentication-415dd",
  storageBucket: "login-authentication-415dd.appspot.com",
  messagingSenderId: "575569779145",
  appId: "1:575569779145:web:4bc25de790c6893c837018"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=new getAuth();
const provider= new GoogleAuthProvider()
const fprovider=new FacebookAuthProvider()
export {auth,provider,fprovider}
