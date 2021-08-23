import NProgress from 'nprogress'
import { changeLocationImage } from './lib/Header/header';
import { handleRoute } from './lib/js/router';
import { debounceSearchOperation } from './lib/js/searchData';

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