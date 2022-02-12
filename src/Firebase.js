import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyC6b-vzL9V5yRaq93Kyiqb9nh2AD2AZtcc",
    authDomain: "bookmyvehicle-5eab4.firebaseapp.com",
    projectId: "bookmyvehicle-5eab4",
    storageBucket: "bookmyvehicle-5eab4.appspot.com",
    messagingSenderId: "612034345915",
    appId: "1:612034345915:web:c44ee7c3fd40ea227ae29e",
    measurementId: "G-7VP3KLTCM9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
export default db; 
export {auth};
  