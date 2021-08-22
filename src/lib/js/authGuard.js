let expires = null;

const secureRoutes = ["bookTickets"];
const loginRoute = "signIn";

let setAuthCookie = (token) => {
    // set cookie to expire in 1 hr from login
    var date = new Date();
    date.setTime(date.getTime() + (1 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = "auth" + "=" + (`${token}`) + expires + "; path=/";
    toggleButton("Log Out");
}

// Get cookie value if it exists.
let getAuthCookie = (name) => {
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
    return match ? match[1] : null;
}

// Auth Guard - Call this method every route change.
// If the route requires user to be logged in [like payments or booking tickets] then authGuard will false.
let authGuard = (route) => {
    for (let i of secureRoutes) {
        if (route.includes(i)) {
            if (getAuthCookie("auth")) {
                return true;
            } else {
                //if (!i.includes(loginRoute)) {}
                return i.includes(loginRoute) ? true : false;
            }
        }
    }
    return true;
}

function toggleButton(buttonIntent) {
    document.getElementById("signIn").innerText = `${buttonIntent}`;
}

export { setAuthCookie, authGuard, toggleButton };