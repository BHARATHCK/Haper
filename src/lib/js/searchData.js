import { getMovieByName } from "./tmdbServer";
import { handleRoute } from "./router";

let moviesObject = [];

let debounce;


function renderResults(results) {

    document.body.addEventListener('click', removeSearchResults, true);

    const resultsWrapper = document.querySelector('.results');

    if (!results.length) {
        //return searchWrapper.classList.remove('show');
    }

    const content = results.map((item) => {
        return `<li id="${"searchItem:"+item.id}">${item.name}</li>`;
    }).join('');

    //searchWrapper.classList.add('show');
    document.getElementById("overlayDiv").style.display = "block";
    resultsWrapper.innerHTML = `<ul>${content}</ul>`;

    document.querySelectorAll("#overlayDiv").forEach(item => {
        item.addEventListener("click", function searchElement(e) {
            console.log("REPEATING , Handle it *********************** " + e.target.id);
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            handleRoute(e);
        })
    })
}

let removeSearchResults = () => {
    document.getElementById("overlayDiv").style.display = "none";
}

function debounceSearchOperation() {

    // Clear the timeout since user action is detected again.
    clearTimeout(debounce);

    debounce = setTimeout(function() {
        searchMovies();
    }, 700);

}

let searchMovies = () => {
    let userSearchString = document.getElementsByClassName("searchbar")[0].value;

    if (!userSearchString) {
        let autocomplete_results = document.getElementById("autocomplete-results");
        autocomplete_results.innerHTML = null;
        return;
    }

    return getMovieByName(userSearchString).then(searchList => {
        moviesObject.length = 0;
        searchList.results.map(item => {
            let currdata = {}
            currdata.name = item.title || item.name || item.original_name;
            currdata.id = item.id;
            moviesObject.push(currdata);
        });

        if (moviesObject.length > 1) {

            //Limit list to 10 items
            if (moviesObject.length > 10) { moviesObject.length = 10 }

            renderResults(moviesObject);

            //for (let i = 0; i < moviesObject.length; i++) {autocomplete_results.innerHTML += '<li>' + moviesObject[i].name + '</li>';}
        }
    });
}


export { searchMovies, debounceSearchOperation };