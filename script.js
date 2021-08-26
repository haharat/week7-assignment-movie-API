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
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchInput}`)
    .then(response => {
      //console.log(response);

      let movies = response.data.Search
      console.log(response.data.totalResults)
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
  return false; //???
}

function getMovieDetail() {
  let imdbID = sessionStorage.getItem("imdbID");

  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`)
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

  //console.log('http://www.omdbapi.com/?apikey=2e2f203c&s=' + searchInput);

  // fetch('http://www.omdbapi.com/?apikey=2e2f203c&s=' + searchInput).then(function (response) {
  //   return response.json()
  // }).then(function (data) {
  //   console.log(data);
  //   let movieList = data.Search;
  //   console.log(movieList);

  //   movieList.forEach(function (movie) {
  //     let title = movie.Title;
  //     let poster = movie.Poster;
  //     let year = movie.Year;
  //     let type = movie.Type;

  //     let cardList = document.querySelector(".cards")
  //     let cardContainer = document.createElement("div");
  //     let movieImageBox = document.createElement("div")
  //     let movieImage = document.createElement("div")
  //     let movieDescription = document.createElement("div")
  //     let movieTitle = document.createElement("h2")
  //     let detailButton = document.createElement("button");

  //     cardList.appendChild(cardContainer)
  //     cardContainer.appendChild(movieImageBox)
  //     cardContainer.appendChild(movieDescription)
  //     cardContainer.appendChild(detailButton)
  //     movieImageBox.appendChild(movieImage)
  //     movieDescription.appendChild(movieTitle)




  //     // add movie image to the image element
  //     movieImage.innerHTML = `<img alt='movie-image'src=${movie.Poster}/>`
  //     // add title and year
  //     movieDescription.innerHTML = `<h2>${movie.Title}, ${movie.Year}</h2>`
  //     detailButton.innerText = "View Details"

  //   });

  // });

  // fetch("http://www.omdbapi.com/?apikey=2e2f203c&s=" + searchInput).then(function (resp) {
  //   return resp.json();
  // }).then(function (data) {
  //   let num = data.Search.length; //to get the length of response, sometimes its less than 10
  //   for (let j = 0; j < num; j++) {
  //     movieList.push(data.Search[j]);
  //   }
  //   return movieList;
  // });
  // console.log(movieList);

  // $.ajax({
  //   dataType: "json",
  //   url: "http://www.omdbapi.com/?apikey=2e2f203c&s=" + searchInput,

  //   success: function (data) {

  //     $.each(data, function (key, val) {
  //       movieList.push("<li id='" + key + "'>" + val + "</li>");
  //     })

  //     console.log(movieList);
  //   }
  // });


  // $.getJSON("http://www.omdbapi.com/?apikey=2e2f203c&s=" + searchInput, function (data) {
  //   let movieList = [];
  //   $.each(data, function (key, val) {
  //     movieList.push("<li id='" + key + "'>" + val + "</li>");
  //   });

  //   $("<ul/>", {
  //     "class": "my-new-list",
  //     html: movieList.join("")
  //   }).appendTo("body");
  // });


  // $('#searchResult').getJSON("http://www.omdbapi.com/?apikey=2e2f203c&s=" + searchInput, function (response) { //callback function
  //   console.log("aaa");

  // let movies = response.data.Search;

  // if (status === 'success') {
  //   let output = "";
  //   $.each(movies, function (index, movie) {
  //     output += `
  //       <div class="col-md-3">
  //         <div class="well text-center">
  //           <img src="${movie.Poster}">
  //           <h5>${movie.Title}</h5>
  //           <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
  //         </div>
  //       </div>
  //     `;
  //   });


  // } else {
  //   console.log('An error occurred.');
  // }



