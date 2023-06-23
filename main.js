// Function to fetch anime details by title search
function fetchAnimeDetails(title) {
  fetch(`https://api.jikan.moe/v4/anime?q=${title}`)
    .then(response => response.json())
    .then(data => {
      const animeContainer = document.getElementById('anime-container');
      animeContainer.innerHTML = ''; // Clear previous anime data

      const backButton = document.createElement('button');
      backButton.textContent = 'Back';
      backButton.addEventListener('click', displayTopAnime);
      animeContainer.appendChild(backButton);

      if (data.data.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No results found.';
        animeContainer.appendChild(noResultsMessage);
      } else {
        const row = document.createElement('div');
        row.classList.add('anime-row');

        data.data.forEach(anime => {
          const animeCard = document.createElement('div');
          animeCard.classList.add('anime-card');

          const image = document.createElement('img');
          image.classList.add('anime-image');
          image.src = anime.images.jpg.image_url; // Access the anime image URL
          image.alt = anime.title;
          animeCard.appendChild(image);

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
          
          row.appendChild(animeCard);
        });

        animeContainer.appendChild(row);
      }
    })
    .catch(error => {
      console.log('Error fetching anime details:', error);
    });
}

// Function to display the top anime
function displayTopAnime() {
  const animeContainer = document.getElementById('anime-container');
  animeContainer.innerHTML = ''; // Clear previous anime data

  const heading = document.createElement('h2');
  heading.textContent = 'Top Anime';
  animeContainer.appendChild(heading);

  const row = document.createElement('div');
  row.classList.add('anime-row');

  fetch('https://api.jikan.moe/v4/top/anime')
    .then(response => response.json())
    .then(data => {
      const topAnime = data.data;

      topAnime.forEach(anime => {
        const animeCard = document.createElement('div');
        animeCard.classList.add('anime-card');

        const image = document.createElement('img');
        image.classList.add('anime-image');
        image.src = anime.images.jpg.image_url; // Access the anime image URL
        image.alt = anime.title;
        animeCard.appendChild(image);

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

        row.appendChild(animeCard);
      });

      animeContainer.appendChild(row);
    })
    .catch(error => {
      console.log('Error fetching top anime:', error);
    });
}


// Function to handle form submission and initiate search
function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    fetchAnimeDetails(searchTerm);
  }
  searchInput.value = '';
}

// Initial display of top anime
displayTopAnime();

// Add event listener to the search form
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', handleSearch);
