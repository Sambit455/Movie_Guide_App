const searchForm = document.querySelector('form');
const inputBox = document.querySelector('.inputBox');
const movieContainer = document.querySelector('.movie-container');


//fetch movies Info.
const getMovieInfo =async (movie) => {
  try{
    const myAPIKey = 'e321a2e8';
  const url = `https://www.omdbapi.com/?i=tt3896198&apikey=${myAPIKey}&t=${movie}`;

  const response =await fetch(url);
  if(!response.ok){
    throw new Error("Unable to fetch movie data.");
  }
  const data =await response.json();
  // console.log(data);
  showMovieData(data);
  }
  catch(error){
    showErrorMessage("No Movie Found! ! !");
  }
}

//Show Movie Data On Screen
const  showMovieData = (data) => {
  movieContainer.innerHTML="";
  movieContainer.classList.remove("noBackground");
  const{Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster} = data;

  const movieElement = document.createElement('div');
  movieElement.classList.add("movie-info");
  movieElement.innerHTML=`<h2>${Title}</h2>
                          <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;
  
  movieGenreElement = document.createElement("div");
  movieGenreElement.classList.add('movie-genre');
  Genre.split(",").forEach(element => {
    const p = document.createElement('p');
    p.innerText = element;
    movieGenreElement.appendChild(p);
  });
  movieElement.appendChild(movieGenreElement);
  movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                            <p><strong>Duration: </strong>${Runtime}</p
                            <p><strong>Cast: </strong>${Actors}</p
                            <p><strong>Plot: </strong>${Plot}</p`;
//Create a div for a Movie Poster
  const moviePosterElement = document.createElement('div');
  moviePosterElement.classList.add("movie-poster");
  moviePosterElement.innerHTML=`<img src="${Poster}"/>`;
  movieContainer.appendChild(moviePosterElement);
  
  movieContainer.appendChild(movieElement);
}

//to display error msg
const showErrorMessage = (message) => {
  movieContainer.innerHTML = `<h2>${message}</h2>`;
  movieContainer.classList.add("noBackground");
}

//Handle form submission
const handleFormSubmission = (e) => {
  e.preventDefault();
  const movieName = inputBox.value.trim()
  console.log(movieName);
  if(movieName !== ""){
    showErrorMessage("Fetching Movie Information...");
    getMovieInfo(movieName)
  }else{
    showErrorMessage("Enter movie name to get movie Information");
  }
}

//Adding EventListener to SearchForm
searchForm.addEventListener('submit',handleFormSubmission);
