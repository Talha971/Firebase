import { auth, signInWithEmailAndPassword } from "./firebase.js";
// signin
function signin() {
    const getPass = document.getElementById("password");
    const getEmail = document.getElementById("email");
    console.log(getPass.value, getEmail.value);

    // for signin
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("user-->", user);
            window.location = "./profile.html"
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error", errorMessage);
        });
};
document.getElementById("loginBtn").addEventListener("click", signin)
