import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
// import { auth } from '../../../server/middleware/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDQZsgiqtpvffEPOybN6vLFphZU-BOV5Rw",
    authDomain: "loginmern-c4a40.firebaseapp.com",
    projectId: "loginmern-c4a40",
    storageBucket: "loginmern-c4a40.appspot.com",
    messagingSenderId: "603168990273",
    appId: "1:603168990273:web:176f547de4dabb561452c0"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();