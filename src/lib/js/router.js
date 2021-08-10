function handleRoute(e) {
    console.log(e.target.id);
    console.log(location.origin);
    console.log(location.pathname)
    location.href = location.origin + location.pathname + '#' + e.target.id;

}

// Handle all the url changes - use popstate
window.addEventListener("popstate", () => {
    renderOnPageUrlChange();
})

function renderOnPageUrlChange() {
    let currentLocation = location.hash.substr(1);

    if (currentLocation === "movies") {
        console.log("MOVIES Data Loaded");
        let movies = [{
                name: "Movie 1",
                id: 1,
                date: "20-12-2020"
            },
            {
                name: "Movie 2",
                id: 2,
                date: "20-12-2019"
            },
            {
                name: "Movie 3",
                id: 3,
                date: "21-12-2021"
            }
        ];

        renderSpecificItem(movies, "moviesData");

    } else if (currentLocation === "events") {
        console.log("EVENTS Data Loaded");
        console.log("MOVIES Data Loaded");
        let movies = [{
                name: "Event 1",
                id: 1,
                date: "20-12-2020"
            },
            {
                name: "Event 2",
                id: 2,
                date: "20-12-2019"
            },
            {
                name: "Event 3",
                id: 3,
                date: "21-12-2021"
            }
        ];

        renderSpecificItem(movies, "eventsData");

    } else if (currentLocation === "sports") {
        console.log("SPORTS Data Loaded");
        console.log("MOVIES Data Loaded");
        let movies = [{
                name: "Sport 1",
                id: 1,
                date: "20-12-2020"
            },
            {
                name: "Sport 2",
                id: 2,
                date: "20-12-2019"
            },
            {
                name: "Sport 3",
                id: 3,
                date: "21-12-2021"
            }
        ];

        renderSpecificItem(movies, "sportsData");

    } else {
        console.log("404");
    }
}

function renderSpecificItem(data, rederId) {
    let div = document.createElement("div");

    data.map(item => {
        let span = document.createElement("span");
        span.innerText = item.name;
        div.appendChild(span);
        div.appendChild(document.createElement("br"));
    });
    renderNullbeforedataisSet();
    document.getElementById(rederId).appendChild(div);
}

function renderNullbeforedataisSet() {
    document.getElementById("moviesData").innerHTML = null;
    document.getElementById("sportsData").innerHTML = null;
    document.getElementById("eventsData").innerHTML = null;
}

window.onload = function() {
    renderOnPageUrlChange();
}

export { handleRoute };