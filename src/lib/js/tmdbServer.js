const baseURL = "https://api.themoviedb.org/3";
const API_KEY = "REMOVED";

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchHistory: `/discover/movie?api_key=${API_KEY}&with_genres=36`
}

let getMovies = (genre) => {
    return fetch(baseURL + requests[genre]).then(function(data) {
        if (data.status == 404) {
            render404Page();
            return;
        }
        return data.json();
    }).catch(function(error) {
        console.log(error);
        render404Page();
    });
}

let getMovieDetails = (movieID) => {
    return fetch(baseURL + `/movie/${movieID}/credits?api_key=${API_KEY}&language=en-US`).then(credits => {
        if (credits.status == 404) {
            render404Page();
            return;
        }
        return credits.json();
    }).catch(error => {
        console.log(error);
        render404Page();
    })
}

let getMovieByName = (userInputText) => {

    return fetch(`${baseURL}/search/movie?api_key=${API_KEY}&language=en-US&query=${userInputText}&page=1&include_adult=false`).then(searchResults => {
        return searchResults.json();
    }).catch(error => {
        console.log(error);
        render404Page();
    })

}

let render404Page = () => {
    document.getElementById("moviesData").innerHTML = `
    <img src="https://i.ibb.co/nmTChk9/404.png" alt="404" width="640px" height="472px">
    `;
    document.getElementById("somethingWentWrong").innerHTML = `<h3>Sorry! Something went wrong, we are looking into it</h3>`
}


export { getMovies, getMovieDetails, getMovieByName };