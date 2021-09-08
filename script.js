//console.log(MAINAPI)

const API_KEY = "2e2f203c";


$(document).ready(function () {

  //document.querySelector(".cards").innerHTML = "";

  $("#searchForm").on("submit", function (e) {
    e.preventDefault();
    let searchInput = $("#searchInput").val();
    //console.log(searchInput);
    getMovieList(searchInput);
  });
});

function getMovieList(searchInput) {
  axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchInput}`)
    .then(response => {
      //console.log(response);

      let movies = response.data.Search
      //console.log(response.data.totalResults)
      let resultHtml = `<h2>${response.data.totalResults} Search results:</h2>`;

      $.each(movies, (index, movie) => {
        console.log(movie);

        resultHtml += `
        <div class="col-lg-3 col-sm-4 mb-3 " >
          <div class="card mb-3 h-100 pb-1" id="card-container">
            <img src="${movie.Poster}" class="card-img-top">
            <h5>${movie.Title}, ${movie.Year}</h5>
            <button class="mt-auto" onclick="getMovieID('${movie.imdbID}')" id="movie-detail"> View Details </button>
          </div>
          </div>
          `
      })
      $('#searchResult').html(resultHtml);

      if (searchInput === "") {
        alert("Input missing")
        $('#searchResult').html("<p style='color:red;'>Please add your search input</p>");
      }
    })
    .catch(error => {
      console.log(error)
    })
}

function getMovieID(imdbID) {
  sessionStorage.setItem('imdbID', imdbID);
  window.location = 'detail.html';
  //return false; //to prevent refreshing the page == e.preventDefault();
}

function getMovieDetail() {
  let imdbID = sessionStorage.getItem("imdbID");

  axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`)
    .then(response => {
      console.log(response)
      let movie = response.data
      console.log(movie);
      let detailHtml = "";
      detailHtml = `
    <div class="row" id="detail-container">
    <div class="col-md-4">
      <img src="${movie.Poster}" class="img-thumbnail">
      </div>
      <div class="col-md-8">
      <h3>${movie.Title}</h3>
      <p><b>Actors:</b> ${movie.Actors}</p>
      <p><b>Director:</b> ${movie.Director}</p>
      <p><b>Genre:</b> ${movie.Genre}</p>
      <p><b>Plot:</b> ${movie.Plot}</p>
      <p><b>Released:</b> ${movie.Released}</p>
      <p><b>Rated:</b> ${movie.Rated}</p>
      <p><b>Awards:</b> ${movie.Awards}</p>
      </div>
    </div>
    `

      $('#movie').html(detailHtml)
    })
    .catch(error => console.log(error))

}

 