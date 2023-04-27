import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyDeqMQOT3OOAEl_R6rQQ_xmYsO8czfGlDo",
    authDomain: "mychat-a0b62.firebaseapp.com",
    projectId: "mychat-a0b62",
    storageBucket: "mychat-a0b62.appspot.com",
    messagingSenderId: "772124469780",
    appId: "1:772124469780:web:bfe569718375174a8d9501",
  })
  .auth();
