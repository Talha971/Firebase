import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
const firebaseConfig = {
    apiKey: "AIzaSyD4c2t8EhDyhufRVOgEpaapHQTfcsziMFk",
    authDomain: "authentication-2957a.firebaseapp.com",
    projectId: "authentication-2957a",
    storageBucket: "authentication-2957a.appspot.com",
    messagingSenderId: "631695294897",
    appId: "1:631695294897:web:e1fec4b1dc495643e3bd90"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


const uploadToStorage = (file) => {
    return new Promise((resolve, reject) => {
        const fileName = file.name

        const storageRef = ref(storage,
            `users/skadh213kjlsad`
        );
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL)
                });
            }
        );
    })
}

let uploadFile = async () => {
    const file = document.getElementById("file")
    const url = await uploadToStorage(file.files[0])
    console.log("url----->", url);
}

const uploadBtn = document.getElementById("uploadBtn")
uploadBtn.addEventListener("click", uploadFile)

const file = document.getElementById("file")
file.addEventListener("change", (e) => {
    const image = document.getElementById("image")
    image.src = URL.createObjectURL(e.target.files[0])

})