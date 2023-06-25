
// Function to fetch anime details by title
function fetchAnimeDetails(title) {
  fetch(`https://api.jikan.moe/v4/anime?q=${title}`)
    .then((response) => response.json())
    .then((data) => {
      const animeDetailsContainer = document.querySelector('#anime-details');
      const characterGalleryContainer = document.querySelector('#character-gallery');
      animeDetailsContainer.innerHTML = '';
      characterGalleryContainer.innerHTML = '';

      if (data.data.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No results found.';
        animeDetailsContainer.appendChild(noResultsMessage);
      } else {
        const anime = data.data[0];

        const animeCard = document.createElement('div');
        animeCard.classList.add('anime-card');
        
        const image = document.createElement('img');
        image.classList.add('anime-image');
        image.src = anime.images.jpg.image_url;
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

        if (anime.studios && anime.studios.length > 0) {
          const studios = document.createElement('div');
          studios.classList.add('anime-studios');
          studios.textContent = `Studios: ${anime.studios.map((studio) => studio.name).join(', ')}`;
          animeCard.appendChild(studios);
        }
        
        if (anime.genres && anime.genres.length > 0) {
          const genres = document.createElement('div');
          genres.classList.add('anime-genres');
          genres.textContent = `Genres: ${anime.genres.map((genre) => genre.name).join(', ')}`;
          animeCard.appendChild(genres);
        }
        if (anime.producers && anime.producers.length > 0) {
          const producers = document.createElement('div');
          producers.classList.add('anime-producers');
          producers.textContent = `Producers: ${anime.producers.map((producer) => producer.name).join(', ')}`;
          animeCard.appendChild(producers);
        }

        if (anime.source) {
          const source = document.createElement('div');
          source.classList.add('anime-source');
          source.textContent = `Source: ${anime.source}`;
          animeCard.appendChild(source);
        }
        
        if (anime.year) {
          const year = document.createElement('div');
          year.classList.add('anime-year');
          year.textContent = `Year of Release: ${anime.year}`;
          animeCard.appendChild(year);
        }
        if (anime.synopsis) {
          const synopsis = document.createElement('div');
          synopsis.classList.add('anime-synopsis');
          synopsis.textContent = `Synopsis: ${anime.synopsis}`;
          animeCard.appendChild(synopsis);
        }
      
        
        
        

        animeDetailsContainer.appendChild(animeCard);

        // Fetch characters for the anime
        fetchAnimeCharacters(anime.mal_id);
      }
    })
    .catch((error) => {
      console.log('Error fetching anime details:', error);
    });
}








// Function to fetch characters for the anime
// Function to fetch characters for the anime
function fetchAnimeCharacters(animeId) {
fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`)
.then((response) => response.json())
.then((data) => {
  const characterGalleryContainer = document.querySelector('#character-gallery');

  if (data.data.length === 0) {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'No character information found.';
    characterGalleryContainer.appendChild(noResultsMessage);
  } else {
    const characterGalleryTitle = document.createElement('h2');
    characterGalleryTitle.textContent = 'Character Gallery';
    characterGalleryContainer.appendChild(characterGalleryTitle);

    const characterList = document.createElement('ul');
    characterList.classList.add('character-list');

    data.data.forEach((character) => {
      const characterItem = document.createElement('li');
      characterItem.classList.add('character-item');

      const characterImage = document.createElement('img');
      characterImage.classList.add('character-image');
      characterImage.src = character.image_url;
      characterImage.alt = character.name;
      characterItem.appendChild(characterImage);
     

      const characterName = document.createElement('div');
      characterName.classList.add('character-name');
      characterName.textContent = character.name;
      characterItem.appendChild(characterName);

      characterList.appendChild(characterItem);
    });

    characterGalleryContainer.appendChild(characterList);
  }
})
.catch((error) => {
  console.log('Error fetching anime characters:', error);
});
}


// Retrieve the title from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title');

// Fetch anime details using the title
if (title) {
  fetchAnimeDetails(title);
}


