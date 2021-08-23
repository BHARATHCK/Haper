import { handleRoute } from "./router";
import { renderDetailsPageForSpecificID } from "./renderDetailsUI";
import { renderTicketBookingPage } from "./renderTicketBookingPage";
import { signUp } from "./signUp";
import { getMovies } from "./tmdbServer";
import { getAuthCookie, deleteCookie } from "./authGuard";

let currentMoviesLoaded = null;

let trendingSelection = document.getElementById("trending");
let comedySelection = document.getElementById("comedy");
let historySelection = document.getElementById("history");

var renderModule = {
    renderOnPageUrlChange: () => {
        let currentLocation = location.hash.substr(13);

        if (currentLocation === "trending" || currentLocation === "") {

            //underline and bold the text
            trendingSelection.style.textDecoration = "underline";
            trendingSelection.style.fontWeight = "900";
            comedySelection.style.textDecoration = "none";
            comedySelection.style.fontWeight = "normal";
            historySelection.style.textDecoration = "none";
            historySelection.style.fontWeight = "normal";

            // Get the most Trending movies on first load by default.
            getMoviesByGenre("fetchTrending");

        } else if (currentLocation === "comedy") {

            comedySelection.style.textDecoration = "underline";
            comedySelection.style.fontWeight = "900";
            trendingSelection.style.textDecoration = "none";
            trendingSelection.style.fontWeight = "normal";
            historySelection.style.textDecoration = "none";
            historySelection.style.fontWeight = "normal";

            getMoviesByGenre("fetchComedyMovies");

        } else if (currentLocation === "history") {

            historySelection.style.textDecoration = "underline";
            historySelection.style.fontWeight = "900";
            comedySelection.style.textDecoration = "none";
            comedySelection.style.fontWeight = "normal";
            trendingSelection.style.textDecoration = "none";
            trendingSelection.style.fontWeight = "normal";

            getMoviesByGenre("fetchHistory");

        } else if (currentLocation.substr(0, 11) == "itemDetails") {
            let movieData = null;
            if (!currentMoviesLoaded) {
                getMoviesByGenre("fetchTrending");
            } else {
                movieData = currentMoviesLoaded.filter(item => item.id == currentLocation.substr(12));
            }

            renderModule.renderNullbeforedataisSet();

            renderDetailsPageForSpecificID(movieData[0]);

        } else if (currentLocation.includes("bookTickets")) {
            let ticketDetails = currentMoviesLoaded.filter(ticketItem => ticketItem.id == currentLocation.substr(12));

            renderModule.renderNullbeforedataisSet();
            renderTicketBookingPage(ticketDetails[0]);

        } else if (currentLocation.includes("signIn")) {
            renderModule.renderNullbeforedataisSet();

            if (getAuthCookie("auth")) {
                deleteCookie("auth");
                document.location.hash = "routechange-trending";
            } else {
                console.log("SINGIN PAGE");
                signUp();
            }
        } else {
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
            img.src = "https://image.tmdb.org/t/p/w200" + item.poster_path;
            img.onerror = "this.onerror=null;this.src='https://source.unsplash.com/user/erondu/300x450';"
            img.className = "card-img";
            img.alt = "Movie Poster";
            img.id = "itemDetails:" + item.id;
            div.appendChild(img);
            div.appendChild(document.createElement("br"));

            let span = document.createElement("span");
            span.innerText = item.title || item.name || item.original_name;
            span.className = "titlecontainer";
            span.id = "itemDetails:" + item.id;
            div.appendChild(span);
            div.appendChild(document.createElement("br"));

            let spanGenre = document.createElement("span");
            spanGenre.innerText = item.genre_ids.join(", ");
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
        document.getElementById("somethingWentWrong").innerHTML = null;
        document.getElementById("sportsData").innerHTML = null;
        document.getElementById("eventsData").innerHTML = null;
        document.getElementById("detailsPage").innerHTML = null;
        document.getElementById("bookTickets").innerHTML = null;
        document.getElementById("signInContainer").innerHTML = null;
        if (document.getElementById("commentSubSection"))
            document.getElementById("commentSubSection").parentElement.removeChild(document.getElementById("commentSubSection"));
        if (document.getElementById("commentSection")) {
            document.getElementById("commentSection").parentElement.removeChild(document.getElementById("commentSection"));
        }
    }
};


let getMoviesByGenre = (movieGenre) => {
    // TMDB movies
    getMovies(movieGenre).then(movieData => {
        currentMoviesLoaded = movieData.results;
        renderModule.renderSpecificItem(movieData.results, "moviesData");
    }).catch(error => {
        console.log(error);
    });
}



export { renderModule };