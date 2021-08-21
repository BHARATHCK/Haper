import { getMovieByName } from "./tmdbServer";

let moviesObject = [];

let debounce;

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

            let autocomplete_results = document.getElementById("autocomplete-results");

            for (let i = 0; i < moviesObject.length; i++) {
                autocomplete_results.innerHTML += '<li>' + moviesObject[i].name + '</li>';

            }
            autocomplete_results.style.display = 'block';
        }
    });
}


export { searchMovies, debounceSearchOperation };