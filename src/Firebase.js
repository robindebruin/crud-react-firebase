import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyAsoXnUKNSGyl6tEsNpOru-lbNM0Sfbsrw",
  authDomain: "crud-react-app-firebase.firebaseapp.com",
  databaseURL: "https://crud-react-app-firebase.firebaseio.com",
  projectId: "crud-react-app-firebase",
  storageBucket: "crud-react-app-firebase.appspot.com",
  messagingSenderId: "927193265546",
  appId: "1:927193265546:web:e7c8bcfafe5eaa6896c473",
  measurementId: "G-R06D9X66BD",
});

firebase.analytics();

const db = firebase.firestore();

export { db };
