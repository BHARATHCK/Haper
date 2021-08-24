import { setAuthCookie } from "./authGuard";
import NProgress from 'nprogress';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJ_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGE_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.M_ID
};

// Initialize Firebase
console.log("INITIALIZING !!!!!!!");
firebase.initializeApp(firebaseConfig);
console.log("INITIALIZED");

const db = firebase.firestore();
const auth = firebase.auth();

let addCommentToCollection = (commentObject) => {
    console.log("Custom Object -> " + commentObject);
    db.collection("comments").doc(commentObject.movieId.toString()).set(commentObject).then(() => {
        console.log("SUCCESS -- FIRESTORE Document added **************");
    }).catch((error) => {
        console.log("ERROR while inserting firestore doc **************" + error.message);
    });
}

let getDocumentFromCollection = (movieId) => {
    var docRef = db.collection("comments").doc(movieId.toString());

    return docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            return doc.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            return false;
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

// Create User
let createUser = (email, password) => {
    try {
        NProgress.set(0.5);
        return auth.createUserWithEmailAndPassword(email, password).then(user => {
            setAuthCookie(user.user.refreshToken, user.user.uid);
            // inser userProfile Record
            createUserProfile(user.user);
            NProgress.set(0.7);
        }).catch(function(error) {
            NProgress.done();
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage, errorCode);
        });
    } catch (err) {
        console.log(err);
        document.getElementById("username").value = err.message.substring(err.message.indexOf(":") + 1, err.message.length);
        document.getElementById("pass").value = "";
        document.getElementById("username").style.boxShadow = "0 0 3px #CC0000";
    }
}

//verifyUser
let verifyUser = (email, password) => {
    try {
        NProgress.set(0.5);
        return auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                NProgress.set(0.7);
                var user = userCredential.user;
                console.log("SUCCESSFUL ********* " + user);
                setAuthCookie(user.refreshToken, user.uid);
            }).catch(err => {
                NProgress.done();
                console.log(err);
                document.getElementById("username").value = err.message.substring(err.message.indexOf(":") + 1, err.message.length);
                document.getElementById("pass").value = "";
                document.getElementById("username").style.boxShadow = "0 0 3px #CC0000";
            })
    } catch (err) {
        console.log(err);
        document.getElementById("username").value = err.message.substring(err.message.indexOf(":") + 1, err.message.length);
        document.getElementById("pass").value = "";
        document.getElementById("username").style.boxShadow = "0 0 3px #CC0000";
    }
}

let createUserProfile = (user) => {

    let userProfileObject = {
        uid: null,
        displayName: null,
        email: null,
        emailVerified: null,
        bookedTicketHistory: []
    }

    userProfileObject.uid = user.uid;
    userProfileObject.displayName = user.email.substring(0, user.email.indexOf('@'));
    userProfileObject.emailVerified = user.emailVerified;

    db.collection("userProfile").doc(user.uid.toString()).set(userProfileObject).then(() => {
        console.log("SUCCESS -- FIRESTORE Document added **************");
    }).catch((error) => {
        console.log("ERROR while inserting firestore doc **************" + error.message);
    });
}

let updateUserProfileWithTicketBooking = (ticketObject) => {

    db.collection("userProfile").doc(ticketObject.uid).update(ticketObject).then(result => {
        console.log("Update successfull" + result);
    }).catch(error => {
        console.log(error);
    })

}

let getUserProfile = (uid) => {
    return db.collection("userProfile").doc(uid).get().then(snapshot => {
        if (snapshot.exists) {
            return snapshot.data();
        }
    })
}

export { addCommentToCollection, getDocumentFromCollection, createUser, verifyUser, updateUserProfileWithTicketBooking, getUserProfile };