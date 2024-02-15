// onAuthStateChanged dekhtahai ke user login hai ya nhi
import {
    auth, onAuthStateChanged, signOut, sendEmailVerification, GoogleAuthProvider,
    db, doc, getDoc, updateDoc, deleteDoc
} from "./firebase.js";


let userName = document.getElementById("userName")
let userEmail = document.getElementById("userEmail")
let main = document.getElementById("main")
let loader = document.getElementById("loader")

onAuthStateChanged(auth, async (user) => {


    if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        console.log("doc-->", docSnap.data());
        if (docSnap.data()) {
            console.log("user-->", user);
            if (location.pathname !== '/profile.html') {
                window.location = 'profile.html'
            }
            loader.style.display = 'none'
            main.style.display = 'block'
            userName.value = docSnap.data().name
            userEmail.innerHTML = user.email;
        }
        //     sendEmailVerification(auth.currentUser)
        //         .then(() => {
        //             console.log("email Sent");
        //         })


    } else {
        console.log("user not login");
        // if (location.pathname !== '/index.html' && location.pathname !== '/register.html') {
        //     window.location = 'index.html'

        // }
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





// // UPDATE PROFILE

let updateProfile = async () => {
    document.getElementById("userName")
    console.log(userName.value, auth.currentUser.uid);

    const userRef = doc(db, "users", auth.currentUser.uid);

    await updateDoc(userRef, {
        name: userName.value
    });
    console.log("profile updated");
}

let update = document.getElementById("updateBtn")
update && update.addEventListener('click', updateProfile)


// delete

let deleteProfile = async () => {
    await deleteDoc(doc(db, "users", auth.currentUser.uid));
    console.log(auth.currentUser);
    userName.value = ""
    userEmail.innerHTML = ""

    console.log("profile delete");

}
let delet = document.getElementById("deleteBtn")
delet && delet.addEventListener('click', deleteProfile)
