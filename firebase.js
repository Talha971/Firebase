import {
    getAuth,

    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,

    // status of login
    onAuthStateChanged,

    // signout
    signOut,

    // sends email verification to the user
    sendEmailVerification,

    // captcha test for signing up with phone number
    RecaptchaVerifier,
    signInWithPhoneNumber,

    //  signing up with google
    GoogleAuthProvider,
    signInWithPopup,

    // facebook
    FacebookAuthProvider

} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'

const firebaseConfig = {
    apiKey: "AIzaSyD4c2t8EhDyhufRVOgEpaapHQTfcsziMFk",
    authDomain: "authentication-2957a.firebaseapp.com",
    projectId: "authentication-2957a",
    storageBucket: "authentication-2957a.appspot.com",
    messagingSenderId: "631695294897",
    appId: "1:631695294897:web:e1fec4b1dc495643e3bd90"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
// google provider
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendEmailVerification,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    googleProvider,
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider,
    facebookProvider

}  