// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVO_obHxbNfbHNTxwhDeiBE_sXV0JmgPA",
  authDomain: "code-verification-1c54a.firebaseapp.com",
  projectId: "code-verification-1c54a",
  storageBucket: "code-verification-1c54a.firebasestorage.app",
  messagingSenderId: "210529007433",
  appId: "1:210529007433:web:f81a13ecd7a488099e4c98",
  measurementId: "G-QJB9JCVPLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);

if (process.env.NODE_ENV === "development") {
  auth.settings.appVerificationDisabledForTesting = true;
}
export {app, auth }; 