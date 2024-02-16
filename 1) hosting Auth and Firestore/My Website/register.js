import {
    auth,
    createUserWithEmailAndPassword,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    googleProvider,
    signInWithPopup,
    GoogleAuthProvider,
    facebookProvider,
    FacebookAuthProvider,
    db,
    doc,
    setDoc
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


////////////////////////////////// GOOGLE ///////////////////////////////////


/////////////////////////////////////// FIRESTORE //////////////////////////////////////////
let addUserToFirestore = async (user) => {
    const res = await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        verify: user.emailVerified,
        photo: user.photoURL,
        uid: user.uid
    })
    console.log("res-->", res);
}



let SignInWithGoogle = () => {

    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log('user-->', user);
            addUserToFirestore(user)
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



// ////////////////////////////////// Facebook ///////////////////////////////////

// let SignInWithFacebook = () => {
//     signInWithPopup(auth, facebookProvider)
//         .then((result) => {
//             const user = result.user;

//             const credential = FacebookAuthProvider.credentialFromResult(result);
//             const accessToken = credential.accessToken;
//             console.log('user-->', user);
//         })
//         .catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // The email of the user's account used.
//             const email = error.customData.email;
//             // The AuthCredential type that was used.
//             const credential = FacebookAuthProvider.credentialFromError(error);
//             console.log('error-->', error);

//             // ...
//         });
// }


// let SignupWithFacebook = document.getElementById("SignupWithFacebook")
// SignupWithFacebook.addEventListener("click", SignInWithFacebook)


