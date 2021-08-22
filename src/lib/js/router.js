import { renderModule } from './renderUI';
import { authGuard, toggleButton, getAuthCookie } from "./authGuard";

function handleRoute(e) {
    location.href = location.origin + location.pathname + '#' + "routechange-" + e.target.id;

    return false;
}

// Handle all the url changes - use popstate
window.addEventListener("popstate", () => {

    if (authGuard(location.hash.substr(13))) {
        if (getAuthCookie("auth")) { toggleButton("Log Out"); }
        renderModule.renderOnPageUrlChange();
    } else {
        // Sign in page
        console.log("SIGNIN Render");
        document.location.hash = "#routechange-signIn";
    }


});

window.onload = function() {
    if (getAuthCookie("auth")) { toggleButton("Log Out"); }
    renderModule.renderOnPageUrlChange();
}

export { handleRoute };