// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBs1YiJMA6AYQbta0PTbHvYErLot8QEq58",
    authDomain: "email-password-auth-d434a.firebaseapp.com",
    projectId: "email-password-auth-d434a",
    storageBucket: "email-password-auth-d434a.appspot.com",
    messagingSenderId: "613274768345",
    appId: "1:613274768345:web:d8b4aa5bd28d13dffcbfc8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;