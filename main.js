const mountainLeft = document.querySelector('#mountain_left');
const mountainRight = document.querySelector('#mountain_right');
const cloud1 = document.querySelector('#clouds_1');
const cloud2 = document.querySelector('#clouds_2');
const text = document.querySelector('#text');
const man = document.querySelector('#man');

window.addEventListener('scroll', () => {
  let value = scrollY;
  mountainLeft.style.left = `-${value / 0.7}px`;
  cloud2.style.left = `-${value * 2}px`;
  mountainRight.style.left = `${value / 0.7}px`;
  cloud1.style.left = `${value * 2}px`;
  text.style.bottom = `-${value}px`;
});


// Function to fetch anime details by title search
function fetchAnimeDetails(title, id) {
  fetch(`https://api.jikan.moe/v4/anime?q=${title}`)
    .then((response) => response.json())
    .then((data) => {

      const animeContainer = document.querySelector('.anime-row-content');
      animeContainer.innerHTML = '';

      const backButton = document.createElement('button');
      backButton.classList.add('backbtn');
      backButton.textContent = 'Back';
      backButton.addEventListener('click', () => {
        animeContainer.innerHTML = '';
        displayTopAnime();
        // displayUpcomingSeason();

        const upcomingAnimeContainer = document.querySelector('.anime-row.upcoming');
        upcomingAnimeContainer.style.display = 'flex';

        const heading = document.querySelector('#myHeading');
        const upcomingHeading = document.querySelector('#upcomingHeading');

        heading.style.display = 'block';
        upcomingHeading.style.display = 'block';

      });
      animeContainer.appendChild(backButton);


      if (data.data.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No results found.';
        animeContainer.appendChild(noResultsMessage);
      } else {
        data.data.forEach((anime) => {
          const animeCard = createAnimeCard(anime);
          animeContainer.appendChild(animeCard);
        });
      }
      const heading = document.querySelector('#myHeading');
      const upcomingHeading = document.querySelector('#upcomingHeading');

      heading.style.display = 'none';
      upcomingHeading.style.display = 'none';

      // Hide upcoming anime container
      const upcomingAnimeContainer = document.querySelector('.anime-row.upcoming');
      upcomingAnimeContainer.style.display = 'none';

    })

    .catch((error) => {
      console.log('Error fetching anime details:', error);
    });
}

// Function to display the top anime
function displayTopAnime() {
  const animeContainer = document.querySelector('.anime-row-content');
  animeContainer.innerHTML = '';

  fetch('https://api.jikan.moe/v4/top/anime')
    .then((response) => response.json())
    .then((data) => {
      const topAnime = data.data.slice(0, 10);

      topAnime.forEach((anime) => {
        const animeCard = createAnimeCard(anime);
        animeContainer.appendChild(animeCard);
      });
    })
    .catch((error) => {
      console.log('Error fetching top anime:', error);
    });
}


// Function to create an anime card element
function createAnimeCard(anime) {
  const animeCard = document.createElement('div');
  animeCard.classList.add('anime-card');

  // Create anchor tag for the image
  const imageLink = document.createElement('a');
  imageLink.href = `details.html?title=${encodeURIComponent(anime.title)}`;

  const image = document.createElement('img');
  image.classList.add('anime-image');
  image.src = anime.images.jpg.image_url;
  image.alt = anime.title;
  imageLink.appendChild(image);

  animeCard.appendChild(imageLink);

  const title = document.createElement('div');
  title.classList.add('anime-title');
  title.textContent = anime.title;
  animeCard.appendChild(title);

  const score = document.createElement('div');
  score.classList.add('anime-score');
  score.textContent = `Score: ${anime.score}`;
  animeCard.appendChild(score);

  const episodes = document.createElement('div');
  episodes.classList.add('anime-episodes');
  episodes.textContent = `Episodes: ${anime.episodes}`;
  animeCard.appendChild(episodes);

  return animeCard;
}

function displayUpcomingSeason() {
  const animeContainer = document.querySelector('.anime-row.upcoming');
  animeContainer.innerHTML = '';

  fetch('https://api.jikan.moe/v4/seasons/upcoming')
    .then((response) => response.json())
    .then((data) => {
      const upcomingAnime = data.data.slice(0, 10);

      upcomingAnime.forEach((anime) => {
        const animeCard = createAnimeCard(anime);
        animeContainer.appendChild(animeCard);
      });
    })
    .catch((error) => {
      console.log('Error fetching upcoming season:', error);
    });
}

// Function to handle form submission and initiate search
function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.querySelector('#search-input');
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== '') {
    fetchAnimeDetails(searchTerm);
  }
}

// Event listener for search form submission
const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', handleSearch);

// Display top anime and upcoming seasons initially
displayTopAnime();
displayUpcomingSeason();

// Retrieve the title from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title');

// Fetch anime details using the title
if (title) {
  fetchAnimeDetails(title);
}