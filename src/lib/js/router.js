import { renderModule } from './renderUI';

function handleRoute(e) {
    location.href = location.origin + location.pathname + '#' + "routechange-" + e.target.id;

    return false;
}

// Handle all the url changes - use popstate
window.addEventListener("popstate", (e) => {
    renderModule.renderOnPageUrlChange(e);
});

window.onload = function(e) {
    renderModule.renderOnPageUrlChange(e);
}

export { handleRoute };