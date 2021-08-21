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
        return data.json();
    }).catch(function(error) {
        console.log(error);
    });
}

let getMovieDetails = (movieID) => {
    return fetch(baseURL + `/movie/${movieID}/credits?api_key=${API_KEY}&language=en-US`).then(credits => {
        return credits.json();
    }).catch(error => {
        console.log(error);
    })
}

let getMovieByName = (userInputText) => {

    return fetch(`${baseURL}/search/movie?api_key=${API_KEY}&language=en-US&query=${userInputText}&page=1&include_adult=false`).then(searchResults => {
        return searchResults.json();
    }).catch(error => {
        console.log(error);
    })

}

export { getMovies, getMovieDetails, getMovieByName };