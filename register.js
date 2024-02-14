import {
    auth,
    createUserWithEmailAndPassword,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    googleProvider,
    signInWithPopup,
    GoogleAuthProvider
} from "./firebase.js";



let confirmation;

// signup
function register() {

    ////////////////////////////// EMAIL AND PASSWORD /////////////////////////////////////

    const getPass = document.getElementById("password");
    const getEmail = document.getElementById("email");
    console.log(getPass.value, getEmail.value);

    // for signup
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("user-->", user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error", errorMessage);
        });

    //////////////////////////////// PHONE NUMBER //////////////////////////////////////////

    // issko sahi chalane ke liye local host pr chalana hota hai
    // http://localhost:5501/register.html

    const getPhone = document.getElementById("phone");
    // window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {})
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+${getPhone.value}`, appVerifier)
        .then((confirmationResult) => {
            confirmation = confirmationResult
            console.log("SMS SENT");
        }).catch((error) => {
            console.log("Error: ", error);
        });


}


let registerBtn = document.getElementById("registerBtn")
registerBtn.addEventListener("click", register)



////////////////////////////////// otp for phone number ///////////////////////////////////
let verify = () => {
    let otp = document.getElementById("otp")
    confirmation.confirm(otp.value).then((result) => {
        const user = result.user;
        console.log("user-->", user);
    }).catch((error) => {
        console.log("error-->", error);
    });
}
let otpVerification = document.getElementById("otpBtn")
otpVerification.addEventListener("click", verify)


////////////////////////////////// Google ///////////////////////////////////


let SignInWithGoogle = () => {

    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log('user-->', user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log("err-->", errorMessage);
        });

}

let SignupWithGoogle = document.getElementById("SignupWithGoogle")
SignupWithGoogle.addEventListener("click", SignInWithGoogle)



////////////////////////////////// Facebook ///////////////////////////////////

let SignInWithFacebook = () => { }


let SignupWithFacebook = document.getElementById("SignupWithGoogle")
SignupWithFacebook.addEventListener("click", SignInWithFacebook)
