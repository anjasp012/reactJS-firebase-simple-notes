// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAk4kQ_XYUS86VlJJLUV7HmY1WEEjtZ530",
    authDomain: "simple-notes-firebase-5c28f.firebaseapp.com",
    projectId: "simple-notes-firebase-5c28f",
    storageBucket: "simple-notes-firebase-5c28f.appspot.com",
    messagingSenderId: "457610317220",
    appId: "1:457610317220:web:8de748942bb44f27a28531",
    measurementId: "G-LL84GF10Q6",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// const firebase = getAnalytics(app);
const database = getDatabase(firebase);

export default firebase;
