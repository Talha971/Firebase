// onAuthStateChanged dekhtahai ke user login hai ya nhi
import {
    auth, onAuthStateChanged, signOut, sendEmailVerification, GoogleAuthProvider,
    db, doc, getDoc, updateDoc, deleteDoc, collection, getDocs, addDoc, onSnapshot,
    serverTimestamp, query, orderBy, where
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



// for getting all user in data base

let getAllUsers = async () => {
    const q = collection(db, "users");

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
}
getAllUsers();


//////////////////////////////// Todo ////////////////////////////////////

let addTodo = async () => {
    let todo = document.getElementById("todo")
    console.log(todo.value);
    const docRef = await addDoc(collection(db, "todos"), {
        status: "pending",
        value: todo.value,
        timestamp: serverTimestamp()
    });
    console.log("Document written with ID: ", docRef.id);
}

let addTodoBtn = document.getElementById("addTodoBtn")
addTodoBtn && addTodoBtn.addEventListener('click', addTodo)



let getAllTodos = async () => {

    const ref = query(collection(db, "todos"),
        orderBy("timestamp", "desc"),
        where("status", "==", "completed"));
    const todoList = document.getElementById("todoList");
    const unsubscribe = onSnapshot(ref, (querySnapshot) => {

        todoList.innerHTML = ``
        querySnapshot.forEach((doc) => {
            todoList.innerHTML += `<li class="list-group-item">${doc.data().value}</li>`
        });
    });
}
getAllTodos();