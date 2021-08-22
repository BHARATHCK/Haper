import { renderModule } from './renderUI';
import { authGuard, toggleButton } from "./authGuard";

function handleRoute(e) {
    location.href = location.origin + location.pathname + '#' + "routechange-" + e.target.id;

    return false;
}

// Handle all the url changes - use popstate
window.addEventListener("popstate", (e) => {
    renderOnAuthCheck();
});

window.onload = function() {
    renderOnAuthCheck();
}

let renderOnAuthCheck = () => {
    if (authGuard(location.hash.substr(13))) {
        renderModule.renderOnPageUrlChange();
        toggleButton("Log Out");
    } else {
        document.location.hash = "#routechange-signIn";
    }
}

export { handleRoute };