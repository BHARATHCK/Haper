import NProgress from 'nprogress'
import { changeLocationImage, invokeLocationSelector } from './lib/Header/header';
import { handleRoute } from './lib/js/router';

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

// eslint-disable-next-line no-undef
document.querySelector(".dropbtn").addEventListener("click", invokeLocationSelector);

// eslint-disable-next-line no-undef
document.querySelectorAll(".locationImageSelection").forEach(
    item => {
        console.log(item);
        item.addEventListener("click", changeLocationImage);
    }
);

document.querySelectorAll(".subMenu").forEach(item => {
    item.addEventListener("click", handleRoute);
});

console.log('hello world')