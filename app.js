// onAuthStateChanged dekhtahai ke user login hai ya nhi
import { auth, onAuthStateChanged, signOut, sendEmailVerification, GoogleAuthProvider  } from "./firebase.js";


let userName = document.getElementById("userName")
let userEmail = document.getElementById("userEmail")
let main = document.getElementById("main")
let loader = document.getElementById("loader")
onAuthStateChanged(auth, (user) => {
    if (user) {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log("email Sent");
            })

        console.log("user-->", user);
        if (location.pathname !== '/profile.html') {
            window.location = 'profile.html'
        }
        loader.style.display = 'none'
        main.style.display = 'block'
        userName.innerHTML = user.email.slice(0, user.email.indexOf("@"));
        userEmail.innerHTML = user.email;
    } else {
        console.log("user not login");
        if (location.pathname !== '/index.html' && location.pathname !== '/register.html') {
            window.location = 'index.html'

        }
    }
});

let logout = () => {
    signOut(auth).then(() => {
        console.log("logout Successful");
        window.location = "./index.html"
    }).catch((error) => {
        console.log("error:", error);

    });
}

let logOut = document.getElementById("logoutBtn")
logOut && logOut.addEventListener('click', logout)