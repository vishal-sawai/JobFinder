// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvmiwUFjE-GGFfa9twbiggrVpmM_hsBdA",
    authDomain: "jobfinderreact.firebaseapp.com",
    projectId: "jobfinderreact",
    storageBucket: "jobfinderreact.appspot.com",
    messagingSenderId: "100426504057",
    appId: "1:100426504057:web:d514fdf364f1e9da1c01a8"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}
const auth = firebase.auth()
const firestore = firebase.firestore()
export { auth, firestore };