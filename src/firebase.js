import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDLA-TGcfPsljwQP7pwEpDcr8Ys34qDEE8",
  authDomain: "whatsapp-mern-ac1cd.firebaseapp.com",
  projectId: "whatsapp-mern-ac1cd",
  storageBucket: "whatsapp-mern-ac1cd.appspot.com",
  messagingSenderId: "904811291765",
  appId: "1:904811291765:web:8efba27beaa9a15645043c",
  measurementId: "G-3P40J6F5WF",
  };


  const firebaseApp = firebase.initializeApp
  (firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;