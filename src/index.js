import NProgress from 'nprogress'
import { changeLocationImage } from './lib/Header/header';
import { handleRoute } from './lib/js/router';
import { debounceSearchOperation } from './lib/js/searchData';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "REMOVED",
    authDomain: "REMOVED",
    projectId: "REMOVED",
    storageBucket: "REMOVED.appspot.com",
    messagingSenderId: "REMOVED",
    appId: "1:REMOVED:web:0a733e4d3e32a9ce00d93f",
    measurementId: "REMOVED"
};

// Initialize Firebase
console.log("INITIALIZING !!!!!!!");
firebase.initializeApp(firebaseConfig);
console.log("INITIALIZED");

const auth = firebase.auth();
const db = firebase.firestore();

console.log(db);


NProgress.start()

setTimeout(function() {
    NProgress.set(0.4)
}, 1000)

setTimeout(function() {
    NProgress.set(0.7)
}, 2000)

setTimeout(function() {
    NProgress.done()
}, 3000)

//document.querySelector(".dropbtn").addEventListener("click", invokeLocationSelector);

document.querySelectorAll(".locationImageSelection").forEach(
    item => {
        item.addEventListener("click", changeLocationImage);
    }
);

document.querySelector(".sign-in").addEventListener("click", handleRoute);

document.querySelectorAll(".subMenu").forEach(item => {
    item.addEventListener("click", handleRoute);
});

document.querySelector(".searchbar").addEventListener("input", debounceSearchOperation);