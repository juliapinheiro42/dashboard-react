import firebase from "firebase/app";
import "firebase/auth";  
import "firebase/firestore";
import 'firebase/storage'; 


const firebaseConfig = {
  apiKey: "AIzaSyDTHWwSZ39JYodagZR3LozHnOQczWTsZro",
  authDomain: "console-6b268.firebaseapp.com",
  projectId: "console-6b268",
  storageBucket: "console-6b268.appspot.com",
  messagingSenderId: "720657013670",
  appId: "1:720657013670:web:b515b9e6d655d5e6394d67",
  measurementId: "G-RKVEBM7B0C"
  };
  
  // Initialize Firebase
 
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
 
  export default firebase;