import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDYrUG534VUYMWfCT43ZL22-z1xDRUk4sU",
    authDomain: "text-001-81c21.firebaseapp.com",
    projectId: "text-001-81c21",
    storageBucket: "text-001-81c21.appspot.com",
    messagingSenderId: "615368084516",
    appId: "1:615368084516:web:9ee19ee1f371700abd5cb1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const gBut = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            let user = result.user
            console.log(user);
            if (user) {
                window.location.href = "dashboard.html"
            }
        })
        .catch((err) => {
            let errorCode = err.code
            let errorMsg = err.message
            console.log(errorCode, errorMsg);
        })
}
window.gBut = gBut

const signUp = () => {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let fname = document.getElementById('firstname').value
    let lname = document.getElementById('lastname').value

    if (email != "" && password != "" && fname != "" && lname != "") {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(user);
                if (email == user.email) {
                    emptyError.textContent = "You have successfully logged in";
                    emptyError.style.color = "green"
                    window.location.href = "index.html"
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode == "auth/email-already-in-use") {
                    emptyError.textContent = "An account already exist with this email address";
                    emptyError.style.color = "orange"
                    setTimeout(() => {
                        emptyError.style.display = "none"
                    }, 3000)
                }
                document.getElementById('email').value = ""
                document.getElementById('password').value = ""
                document.getElementById('firstname').value = ""
                document.getElementById('lastname').value = ""
            })
    } else {
        emptyError.textContent = "Please fill in the empty spaces provided";
        emptyError.style.color = "red"
        setTimeout(() => {
            emptyError.style.display = "none"
        }, 3000)
    }

    }
    window.signUp = signUp

const signIn = () => {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    if (email != "" && password != "") {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(user);
                emptyError.textContent = "You have successfully logged in";
                emptyError.style.color = "green"
                if (user) {
                    window.location.href = "dashboard.html"
                } else {
                    window.location.href = "index.html"
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode == "auth/invalid-login-credentials") {
                    emptyError.textContent = "Incorrect email or password";
                    emptyError.style.color = "orange"
                    setTimeout(() => {
                        emptyError.style.display = "none"
                    }, 3000)
                }
                document.getElementById('email').value = ""
                document.getElementById('password').value = ""
            })
    } else {
        emptyError.textContent = "Please fill in the empty spaces provided";
        emptyError.style.color = "red"
        setTimeout(() => {
            emptyError.style.display = "none"
        }, 3000)
    }
}
window.signIn = signIn