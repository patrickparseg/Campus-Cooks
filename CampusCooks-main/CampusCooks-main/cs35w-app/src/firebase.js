import {initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCeliwNsYdu8G4uTMu_0pvZYxj--Dkng1M",
    authDomain: "cs35w-recipe-app.firebaseapp.com",
    databaseURL: "https://cs35w-recipe-app-default-rtdb.firebaseio.com",
    projectId: "cs35w-recipe-app",
    storageBucket: "cs35w-recipe-app.appspot.com",
    messagingSenderId: "404495630583",
    appId: "1:404495630583:web:8c685a68e3ca3b022113f2",
    measurementId: "G-QSQEE9CWWK"
};

const app = initializeApp(firebaseConfig);
//export const firestore = getFirestore(app)

// Initialize Cloud Firestore and get a reference to the service

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app