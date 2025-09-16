// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmc-2IZVoFhHHUf5IC34C9Q6DIAsKm7MU",
  authDomain: "authi-83fa6.firebaseapp.com",
  projectId: "authi-83fa6",
  storageBucket: "authi-83fa6.firebasestorage.app",
  messagingSenderId: "992028534796",
  appId: "1:992028534796:web:902836ae4283e1a94d6629",
  measurementId: "G-MKKVGLDL11"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export{app,auth}