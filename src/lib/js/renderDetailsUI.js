import { handleRoute } from "./router";
import { addComment, initializeCommentSection } from "./commentBox";
import { getMovieDetails } from "./tmdbServer";
import { renderCastCard } from "./castAndCrewUI";
import { genreConfig } from "./renderUI";

function renderDetailsPageForSpecificID(data) {

    let movieCredits = null;

    getMovieDetails(data.id).then(credits => {
        movieCredits = credits;
        console.log("movieCredits : " + movieCredits);
        // Once resolved render the page.
        renderDetailsPage(data, movieCredits);
    }).catch(error => {
        console.log(error);
    })

}

let renderDetailsPage = (data, movieCredits) => {
    // Create child elements

    let commSec = document.createElement("div");
    commSec.id = "commentSection";

    let commSubSec = document.createElement("div");
    commSubSec.id = "commentSubSection";

    document.body.insertBefore(commSec, document.body.lastElementChild);
    document.body.insertBefore(commSubSec, document.body.lastElementChild);


    let detailsWrapperDiv = document.createElement("div");
    detailsWrapperDiv.className = "details-wrapper";

    let detailsContainerMain = document.createElement("div");
    detailsContainerMain.className = "details-container-main";

    // Image
    let detailsContainerImg = document.createElement("img");
    detailsContainerImg.className = "details-container-img";
    detailsContainerImg.src = "https://image.tmdb.org/t/p/w500" + data.backdrop_path;
    detailsContainerImg.alt = "poster not found";

    // append to detailsContainerMain
    detailsContainerMain.appendChild(detailsContainerImg);

    // movie details area
    let detailsMovie = document.createElement("div");
    detailsMovie.className = "details-movie";

    // Movie title
    let movieTitle = document.createElement("div");
    movieTitle.className = "details-movie-title";
    movieTitle.innerText = data.title || data.name || data.original_name;

    detailsMovie.appendChild(movieTitle);
    detailsMovie.appendChild(document.createElement("br"));

    // movie runtime
    let movieRuntime = document.createElement("span");
    movieRuntime.className = "details-movie-runtime";
    movieRuntime.innerText = "IMDB: " + data.vote_average;

    detailsMovie.appendChild(movieRuntime);

    // genre
    let movieGenre = document.createElement("span");
    movieGenre.className = "details-movie-genre";

    if (data.genre_ids) {
        let genreArr = data.genre_ids.map(item => {
            if (genreConfig[item]) {
                return genreConfig[item].trim()
            } else {
                return ""
            }
        }).filter(genre => genre);

        genreArr.length = 3;

        movieGenre.innerText = genreArr.join(", ");

        detailsMovie.appendChild(movieGenre);
    } else if (data.genres) {
        let genreArr = data.genres.map(item => {
            return item.name;
        }).join(", ");

        movieGenre.innerText = genreArr;

        detailsMovie.appendChild(movieGenre);
    }


    // Button
    let bookTicketButton = document.createElement("button");
    bookTicketButton.className = "details-movie-book-tickets";
    bookTicketButton.id = "bookTickets:" + data.id;
    bookTicketButton.innerText = "Book Tickets";

    detailsMovie.appendChild(bookTicketButton);

    detailsContainerMain.appendChild(detailsMovie);

    detailsWrapperDiv.appendChild(detailsContainerMain);
    detailsWrapperDiv.appendChild(document.createElement("br"));


    // Next section - director and crew
    let detailsContainerAttributes = document.createElement("div");
    detailsContainerAttributes.className = "details-container-attrib";

    let detailsMovieAbout = document.createElement("div");
    detailsMovieAbout.className = "details-movie-about";
    detailsMovieAbout.innerText = "About the movie";

    detailsContainerAttributes.appendChild(detailsMovieAbout);

    let detailsMoviePlot = document.createElement("div");
    detailsMoviePlot.className = "details-movie-plot";
    detailsMoviePlot.innerText = data.overview;

    detailsContainerAttributes.appendChild(detailsMoviePlot);


    // Director div
    let directorDiv = document.createElement("div");
    directorDiv.className = "details-movie-director";

    let directorTag = document.createElement("div");
    directorTag.className = "details-movie-director-tag";
    directorTag.innerText = "Director";

    let directorData = document.createElement("div");
    directorData.className = "details-movie-director-data";
    let crewDetails = movieCredits.crew.filter(crewDetails => { if (crewDetails.known_for_department == "Directing" || crewDetails.department == "Directing" || crewDetails.job == "Director") { return crewDetails.name } })[0];
    directorData.innerText = crewDetails.name;


    directorDiv.appendChild(directorTag);
    detailsContainerAttributes.appendChild(directorDiv);

    // Cast div
    let castDiv = document.createElement("div");
    castDiv.className = "details-movie-cast";

    let castTag = document.createElement("div");
    castTag.className = "details-movie-cast-tag";
    castTag.innerText = "Actors";

    let castData = document.createElement("div");
    castData.className = "details-movie-cast-data";


    directorDiv.appendChild(directorTag);
    directorDiv.appendChild(renderCastCard(crewDetails));
    detailsContainerAttributes.appendChild(directorDiv);


    castDiv.appendChild(castTag);
    // add profilecards for actors [Max 10 actors]
    movieCredits.cast.length = 10
    movieCredits.cast.forEach(actorDetails => {
        castData.appendChild(renderCastCard(actorDetails));
    });
    castDiv.appendChild(castData);
    detailsContainerAttributes.appendChild(castDiv);


    // Write page to document
    document.getElementById("detailsPage").appendChild(detailsWrapperDiv);
    document.getElementById("detailsPage").appendChild(detailsContainerAttributes);

    // Comment Section

    let commentTitle = document.createElement("div");
    commentTitle.className = "commentTitle";
    commentTitle.innerText = "Comment Section";

    let commentDiv = document.createElement("div");
    commentDiv.className = "commentBox";

    let textArea = document.createElement("textarea");
    textArea.id = "commentText";
    textArea.placeholder = "Remember, be nice!"
    textArea.rows = 4;
    textArea.cols = 40;

    commentDiv.appendChild(textArea);


    let addCommentButton = document.createElement("button");
    addCommentButton.className = "addCommentButton";
    addCommentButton.id = "mainCommentButton";
    addCommentButton.innerText = "Add Comment";

    commentDiv.appendChild(addCommentButton);

    document.getElementById("commentSection").appendChild(commentTitle);
    document.getElementById("commentSection").appendChild(commentDiv);

    //Event listener for adding comments
    document.querySelector(".addCommentButton").addEventListener("click", (e) => {
        addComment(e);
    })

    // add Event Listener to button for booking tickets.
    document.querySelector(".details-movie-book-tickets").addEventListener("click", handleRoute);

    initializeCommentSection(data);
}

export { renderDetailsPageForSpecificID };