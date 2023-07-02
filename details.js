
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
      }
    })
    .catch((error) => {
      console.log('Error fetching anime details:', error);
    });
}



// Retrieve the title from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title');

// Fetch anime details using the title
if (title) {
  fetchAnimeDetails(title);
}
const t=title;
console.log(title);




fetch('https://graphql.anilist.co', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query: `
      query ($title: String) {
        Media(type: ANIME, search: $title) {
          characters {
            edges {
              node {
                name {
                  full
                }
                image {
                  large
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      title: t,
    },
  }),
})
  .then(response => response.json())
  .then(data => {
    // Extract the characters from the response
    const characters = data.data.Media.characters.edges;

    // Get the character list element
    const characterList = document.getElementById('character-list');

    // Display each character's name and image
    characters.forEach(character => {
      const listItem = document.createElement('li');

      // Create an image element
      const image = document.createElement('img');
      image.src = character.node.image.large;
      image.alt = character.node.name.full;
      listItem.appendChild(image);

      // Create a span element for the character name
      const nameSpan = document.createElement('span');
      nameSpan.textContent = character.node.name.full;
      listItem.appendChild(nameSpan);

      characterList.appendChild(listItem);
     
      const fetchAnimeReviews = async (animeTitle) => {
        const query = `
          query ($search: String) {
            Media(search: $search, type: ANIME) {
              title {
                romaji
              }
              reviews(perPage: 10) {
                nodes {
                  rating
                  summary
                  user {
                    name
                  }
                }
              }
            }
          }
        `;
      
        const variables = {
          search: animeTitle
        };
      
        const response = await fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables
          }),
        });
      
        const data = await response.json();
        const animeData = data.data.Media;
      
        if (animeData) {
          const title = animeData.title.romaji;
          const reviews = animeData.reviews.nodes;
      
          const reviewsContainer = document.getElementById('reviewsContainer');
          reviewsContainer.innerHTML = `<h2>Reviews for ${title}:</h2>`;
      
          reviews.forEach(review => {
            const rating = review.rating;
            const summary = review.summary;
            const user = review.user.name;
      
            const reviewElement = document.createElement('div');
            reviewElement.innerHTML = `
              <strong>User:</strong> ${user}<br>
              <strong>Rating:</strong> ${rating}<br>
              <strong>Summary:</strong> ${summary}<br><br>
            `;
      
            reviewsContainer.appendChild(reviewElement);
          });
        }
      };
      
      fetchAnimeReviews(t);
      
      
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

  



