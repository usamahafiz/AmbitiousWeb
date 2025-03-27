// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAxuf00UUgiOrH-O-sRF1yJX3dMOLvhuVE",
  authDomain: "shop-nest-278.firebaseapp.com",
  databaseURL: "https://shop-nest-278-default-rtdb.firebaseio.com",
  projectId: "shop-nest-278",
  storageBucket: "shop-nest-278.appspot.com",
  messagingSenderId: "914929799860",
  appId: "1:914929799860:web:7d6ba6c8752a67de8cfde1",
  measurementId: "G-EV4B5G2JLD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fireStore = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, fireStore, storage };