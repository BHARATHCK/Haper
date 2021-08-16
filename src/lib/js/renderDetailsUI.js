import { handleRoute } from "./router";
import { addComment, initializeCommentSection } from "./commentBox";

function renderDetailsPageForSpecificID(data) {

    console.log("MOVIE DATA RECEIVED -----> " + data);

    let detailsWrapperDiv = document.createElement("div");
    detailsWrapperDiv.className = "details-wrapper";

    let detailsContainerMain = document.createElement("div");
    detailsContainerMain.className = "details-container-main";

    // Image
    let detailsContainerImg = document.createElement("img");
    detailsContainerImg.className = "details-container-img";
    detailsContainerImg.src = data.posterUrl;
    detailsContainerImg.alt = "poster not found";

    // append to detailsContainerMain
    detailsContainerMain.appendChild(detailsContainerImg);

    // movie details area
    let detailsMovie = document.createElement("div");
    detailsMovie.className = "details-movie";

    // Movie title
    let movieTitle = document.createElement("span");
    movieTitle.className = "details-movie-title";
    movieTitle.innerText = data.title;

    detailsMovie.appendChild(movieTitle);
    detailsMovie.appendChild(document.createElement("br"));

    // movie runtime
    let movieRuntime = document.createElement("span");
    movieRuntime.className = "details-movie-runtime";
    movieRuntime.innerText = data.runtime;

    detailsMovie.appendChild(movieRuntime);

    let dot = document.createElement("span");
    dot.className = "dot";


    detailsMovie.appendChild(dot);



    // genre
    let movieGenre = document.createElement("span");
    movieGenre.className = "details-movie-genre";
    movieGenre.innerText = data.genres.join(", ");

    detailsMovie.appendChild(movieGenre);
    detailsMovie.appendChild(dot);

    // rating
    let movieRating = document.createElement("span");
    movieRating.className = "details-movie-rating";
    movieRating.innerText = data.genres.join(", ");

    detailsMovie.appendChild(movieRating);

    // Button
    let bookTicketButton = document.createElement("button");
    bookTicketButton.className = "details-movie-book-tickets";
    bookTicketButton.id = "bookTickets:" + data.id;
    console.log("BUTTON ID -------> " + bookTicketButton.id);
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
    detailsMoviePlot.innerText = data.plot;

    detailsContainerAttributes.appendChild(detailsMoviePlot);


    // Director div
    let directorDiv = document.createElement("div");
    directorDiv.className = "details-movie-director";

    let directorTag = document.createElement("div");
    directorTag.className = "details-movie-director-tag";
    directorTag.innerText = "Director";

    let directorData = document.createElement("div");
    directorData.className = "details-movie-director-data";
    directorData.innerText = data.director;

    directorDiv.appendChild(directorTag);
    directorDiv.appendChild(directorData);
    detailsContainerAttributes.appendChild(directorDiv);

    // Cast div
    let castDiv = document.createElement("div");
    castDiv.className = "details-movie-cast";

    let castTag = document.createElement("div");
    castTag.className = "details-movie-cast-tag";
    castTag.innerText = "Actors";

    let castData = document.createElement("div");
    castData.className = "details-movie-cast-data";
    castData.innerText = data.actors;

    directorDiv.appendChild(directorTag);
    directorDiv.appendChild(directorData);
    detailsContainerAttributes.appendChild(directorDiv);


    castDiv.appendChild(castTag);
    castDiv.appendChild(castData);
    detailsContainerAttributes.appendChild(castDiv);


    // Write page to document
    document.getElementById("detailsPage").appendChild(detailsWrapperDiv);
    document.getElementById("detailsPage").appendChild(detailsContainerAttributes);

    // Comment Section
    let commentDiv = document.createElement("div");
    commentDiv.className = "commentBox";

    let textArea = document.createElement("textarea");
    textArea.id = "commentText";
    textArea.rows = 4;
    textArea.cols = 50;

    commentDiv.appendChild(textArea);


    let addCommentButton = document.createElement("button");
    addCommentButton.className = "addCommentButton";
    addCommentButton.id = "mainCommentButton";
    addCommentButton.innerText = "Add Comment";

    commentDiv.appendChild(addCommentButton);

    document.getElementById("commentSection").appendChild(commentDiv);

    //Event listener for adding comments
    document.querySelector(".addCommentButton").addEventListener("click", (e) => {
        addComment(e);
    })

    // add Event Listener to button for booking tickets.
    document.querySelector(".details-movie-book-tickets").addEventListener("click", handleRoute);

    initializeCommentSection();

}

export { renderDetailsPageForSpecificID };