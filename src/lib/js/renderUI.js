import { movies } from "./server";
import { handleRoute } from "./router";
import { renderDetailsPageForSpecificID } from "./renderDetailsUI";
import { renderTicketBookingPage } from "./renderTicketBookingPage";

var renderModule = {
    renderOnPageUrlChange: () => {
        let currentLocation = location.hash.substr(13);
        console.log(currentLocation)
        if (currentLocation === "movies" || currentLocation === "") {
            console.log("MOVIES Data Loaded");

            renderModule.renderSpecificItem(movies, "moviesData");

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

            renderModule.renderSpecificItem(movies, "eventsData");

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

            renderModule.renderSpecificItem(movies, "sportsData");

        } else if (currentLocation.substr(0, 11) == "itemDetails") {
            console.log(currentLocation.substr(12));
            console.log("Movies : " + movies);
            let movieData = movies.filter(item => item.id == currentLocation.substr(12));
            console.log("MOVIE ----------> " + movieData[0].title);

            renderModule.renderNullbeforedataisSet();

            renderDetailsPageForSpecificID(movieData[0]);

        } else if (currentLocation.includes("bookTickets")) {
            let ticketDetails = movies.filter(ticketItem => ticketItem.id == currentLocation.substr(12));
            renderModule.renderNullbeforedataisSet();
            renderTicketBookingPage(ticketDetails[0]);
            console.log("PLEASE SELECT TICKETS TO BOOK ---> " + currentLocation.substr(12));
        } else {
            console.log("404");
            location.href = "404.html";
        }
    },

    renderSpecificItem: (data, renderId) => {

        let divMain = document.createElement("div");
        divMain.className = "displayArea";

        data.map(item => {
            let div = document.createElement("div");
            div.className = "card";
            div.id = "itemDetails:" + item.id;

            let img = document.createElement("img");
            img.src = item.posterUrl;
            img.onerror = "this.onerror=null;this.src='https://source.unsplash.com/user/erondu/300x450';"
            img.className = "card-img";
            img.alt = "Movie Poster";
            img.id = "itemDetails:" + item.id;
            div.appendChild(img);
            div.appendChild(document.createElement("br"));

            let span = document.createElement("span");
            span.innerText = item.title;
            span.className = "titlecontainer";
            span.id = "itemDetails:" + item.id;
            div.appendChild(span);
            div.appendChild(document.createElement("br"));

            let spanGenre = document.createElement("span");
            spanGenre.innerText = item.genres.join(", ");
            spanGenre.className = "genrecontainer";
            spanGenre.id = "itemDetails:" + item.id;
            div.appendChild(spanGenre);
            div.appendChild(document.createElement("br"));

            divMain.appendChild(div);

        });

        renderModule.renderNullbeforedataisSet();
        document.getElementById(renderId).appendChild(divMain);
        document.getElementById(renderId).appendChild(document.createElement("br"));

        document.querySelectorAll(".card").forEach(cardItem => {
            cardItem.addEventListener("click", handleRoute);
        });

    },

    renderNullbeforedataisSet: () => {
        document.getElementById("moviesData").innerHTML = null;
        document.getElementById("sportsData").innerHTML = null;
        document.getElementById("eventsData").innerHTML = null;
        document.getElementById("detailsPage").innerHTML = null;
        document.getElementById("bookTickets").innerHTML = null;
    }
};

export { renderModule };