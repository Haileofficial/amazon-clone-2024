import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDv_VroYnRmNtpGgaye-qiRUT6z9yxoaAs",
    authDomain: "project-2-ddd77.firebaseapp.com",
    projectId: "project-2-ddd77",
    storageBucket: "project-2-ddd77.appspot.com",
    messagingSenderId: "592965200520",
    appId: "1:592965200520:web:e2aaf9ffc3eb6aa478cd3d"
    };


const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
