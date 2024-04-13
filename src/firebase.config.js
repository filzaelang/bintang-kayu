import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCSU1i8L6afV3qqCoZ3lXzctK6xt_WZ_Zs",
    authDomain: "shop-firebase-77a1c.firebaseapp.com",
    databaseURL: "gs://shop-firebase-77a1c.appspot.com",
    projectId: "shop-firebase-77a1c",
    storageBucket: "shop-firebase-77a1c.appspot.com",
    messagingSenderId: "961655930056",
    appId: "1:961655930056:web:abfb80dd00f4c243bc79fd",
    measurementId: "G-K8J0C8QH1L"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;