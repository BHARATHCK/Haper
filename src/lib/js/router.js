import { renderModule } from './renderUI';

function handleRoute(e) {
    console.log(e.target.id);
    console.log(location.origin);
    console.log(location.pathname);
    console.log("CHECK The BOOKING Route : " + location.origin + location.pathname + '#' + "routechange-" + e.target.id);
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