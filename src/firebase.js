import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// initialize database

const config = {
  apiKey: "AIzaSyDXGolJhF9x6lB9ZQnMUzwQ-bf9rBVLodg",
  authDomain: "parkplaza-f30ab.firebaseapp.com",
  databaseURL: "https://parkplaza-f30ab.firebaseio.com",
  projectId: "parkplaza-f30ab",
  storageBucket: "parkplaza-f30ab.appspot.com",
  messagingSenderId: "259787363345",
  appId: "1:259787363345:web:4bf18b83da31f3513e0db0",
  measurementId: "G-9L133VGWCC"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

// firestore.settings({ timestampsInSnapshots: true });

window.firebase = firebase;

export default firebase;