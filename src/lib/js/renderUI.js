import { handleRoute } from "./router";
import { renderDetailsPageForSpecificID } from "./renderDetailsUI";
import { renderTicketBookingPage } from "./renderTicketBookingPage";
import { signUp } from "./signUp";
import { getMovies, getMovieByID } from "./tmdbServer";
import { getAuthCookie, deleteCookie } from "./authGuard";
import { getCarouselDiv, initializeCarousel, carouselInterval } from "./carousel";

let currentMoviesLoaded = null;
let carouselImages = [];

let genreConfig = {
    28: "Action     ",
    12: "Adventure ",
    16: "Animation  ",
    35: "Comedy     ",
    80: "Crime      ",
    99: "Documentary",
    18: "Drama      ",
    10751: "Family     ",
    14: "Fantasy    ",
    36: "History    ",
}

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
            getMoviesByGenre("fetchTrending", "Trending Now");

        } else if (currentLocation === "comedy") {

            comedySelection.style.textDecoration = "underline";
            comedySelection.style.fontWeight = "900";
            trendingSelection.style.textDecoration = "none";
            trendingSelection.style.fontWeight = "normal";
            historySelection.style.textDecoration = "none";
            historySelection.style.fontWeight = "normal";

            getMoviesByGenre("fetchComedyMovies", "Comedy");

        } else if (currentLocation === "history") {

            historySelection.style.textDecoration = "underline";
            historySelection.style.fontWeight = "900";
            comedySelection.style.textDecoration = "none";
            comedySelection.style.fontWeight = "normal";
            trendingSelection.style.textDecoration = "none";
            trendingSelection.style.fontWeight = "normal";

            getMoviesByGenre("fetchHistory", "History");

        } else if (currentLocation.substr(0, 11) == "itemDetails") {
            let movieData = null;
            if (!currentMoviesLoaded) {
                getMoviesByGenre("fetchTrending", "Trending Now");
            } else {
                movieData = currentMoviesLoaded.filter(item => item.id == currentLocation.substr(12));
            }

            renderModule.renderNullbeforedataisSet();

            renderDetailsPageForSpecificID(movieData[0]);

        } else if (currentLocation.substr(0, 10) == "searchItem") {
            getMovieByID(currentLocation.substr(11)).then(movieIdDetails => {
                renderModule.renderNullbeforedataisSet();
                renderDetailsPageForSpecificID(movieIdDetails);
            });
        } else if (currentLocation.includes("bookTickets")) {

            renderModule.renderNullbeforedataisSet();

            if (!currentMoviesLoaded) {
                getMoviesByGenre("fetchTrending", "Trending Now");
                return;
            }
            let ticketDetails = currentMoviesLoaded.filter(ticketItem => ticketItem.id == currentLocation.substr(12));
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

    renderSpecificItem: (data, renderId, title) => {

        // Remove data before setting
        renderModule.renderNullbeforedataisSet();

        //Render Carousel First
        document.getElementById("carousel-wrapper").appendChild(getCarouselDiv(carouselImages));
        // Initialize carousel
        initializeCarousel();

        let moviesGenreTitle = document.createElement("div");
        moviesGenreTitle.className = "moviesGenreTitle";
        moviesGenreTitle.innerText = title;
        moviesGenreTitle.style.fontWeight = 800;

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
            let genreDetailArr = item.genre_ids.map(item => {
                if (genreConfig[item]) {
                    return genreConfig[item].trim()
                } else {
                    return ""
                }
            }).filter(genre => genre);
            genreDetailArr.length = 2;
            spanGenre.innerText = genreDetailArr.join(", ");
            spanGenre.className = "genrecontainer";
            spanGenre.id = "itemDetails:" + item.id;
            div.appendChild(spanGenre);
            div.appendChild(document.createElement("br"));

            divMain.appendChild(div);

        });

        document.getElementById(renderId).appendChild(moviesGenreTitle);
        document.getElementById(renderId).appendChild(divMain);
        document.getElementById(renderId).appendChild(document.createElement("br"));

        document.querySelectorAll(".card").forEach(cardItem => {
            cardItem.addEventListener("click", handleRoute);
        });

    },

    renderCarousel: () => {

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
        // Remove carousel
        if (document.getElementById("carousel-wrapper")) {
            document.getElementById("carousel-wrapper").innerHTML = null;
        }
        // remove the timeout
        if (carouselInterval) {
            window.clearInterval(carouselInterval);
        }
    }
};


let getMoviesByGenre = (movieGenre, title) => {
    // TMDB movies
    getMovies(movieGenre).then(movieData => {
        currentMoviesLoaded = movieData.results;
        getBackDropsForCarousel(currentMoviesLoaded);
        renderModule.renderSpecificItem(movieData.results, "moviesData", title);
    }).catch(error => {
        console.log(error);
    });
}

let getBackDropsForCarousel = (data) => {
    for (let movieObj = 0; movieObj < 6; movieObj++) {
        carouselImages.push(data[movieObj].backdrop_path);
    }
}



export { renderModule, genreConfig, currentMoviesLoaded };