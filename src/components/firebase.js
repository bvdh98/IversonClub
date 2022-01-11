import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore"
import "firebase/compat/auth";
import { firebaseConfig } from "../firebaseConfig";

const Firebase = firebase.initializeApp(firebaseConfig);
export const auth = Firebase.auth();
export const db = getFirestore();
export default Firebase;
