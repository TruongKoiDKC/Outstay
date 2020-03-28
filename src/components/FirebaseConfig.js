import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyArjKaMFHdPWVTQHn0JA3JIK6SeSjQMyxk",
    authDomain: "outstaydb.firebaseapp.com",
    databaseURL: "https://outstaydb.firebaseio.com",
    projectId: "outstaydb",
    storageBucket: "outstaydb.appspot.com",
    messagingSenderId: "840980625909",
    appId: "1:840980625909:web:3b33d34ce4c1a4df3b88bc",
    measurementId: "G-J5586P11NN"
  };
  // Initialize Firebase
  export const firebaseApp = firebase.initializeApp(firebaseConfig);
  // firebase.analytics();