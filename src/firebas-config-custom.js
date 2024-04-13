import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCSU1i8L6afV3qqCoZ3lXzctK6xt_WZ_Zs",
    authDomain: "shop-firebase-77a1c.firebaseapp.com",
    databaseURL: "https://shop-firebase-77a1c.firebaseio.com/",
    projectId: "shop-firebase-77a1c",
    storageBucket: "shop-firebase-77a1c.appspot.com",
    messagingSenderId: "961655930056",
    appId: "1:961655930056:web:abfb80dd00f4c243bc79fd",
    measurementId: "G-K8J0C8QH1L"
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const dbCustom = firebase.firestore();

export default dbCustom;

