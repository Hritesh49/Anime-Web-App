
// Function to fetch anime details by title

function fetchAnimeDetails(title) {
  fetch(`https://api.jikan.moe/v4/anime?q=${title}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const aId = data.data[0].images.jpg.large_image_url;
      console.log(aId);
      const ad = document.getElementById('anime-details');
      const animeCard = document.createElement('div');
      animeCard.classList.add("animecard");
      const pic = document.createElement('img');
      pic.src = aId;
      animeCard.appendChild(pic);
      ad.appendChild(animeCard);

      const a2 = document.createElement('div');
      a2.classList.add('detaildiv');
      animeCard.appendChild(a2);

      const title = document.createElement('h1');
      title.innerHTML = data.data[0].title;
      a2.appendChild(title);

      const studio = document.createElement('h3');
      studio.innerHTML = `<strong>Studio:</strong> ${data.data[0].studios[0].name}`;
      a2.appendChild(studio);

      const genre = document.createElement('h3');
      genre.innerHTML = `<strong>Genres:</strong>${data.data[0].genres.map((genre) => genre.name).join(', ')}`;
      a2.appendChild(genre);

      const rating = document.createElement('h3');
      rating.innerHTML = `<strong>Rating:</strong> ${data.data[0].rating}`;
      a2.appendChild(rating);

      const season = document.createElement('h3');
      season.innerHTML = `<strong>Season:</strong> ${data.data[0].season}`;
      a2.appendChild(season);

      const episodes = document.createElement('h3');
      episodes.innerHTML = `<strong>Episodes:</strong> ${data.data[0].episodes}`;
      a2.appendChild(episodes);

      const status = document.createElement('h3');
      status.innerHTML = `<strong>Status:</strong> ${data.data[0].status}`;
      a2.appendChild(status);


      const rank = document.createElement('h3');
      rank.innerHTML = `<strong>Rank:</strong> ${data.data[0].rank}`;
      a2.appendChild(rank);

      const score = document.createElement('h3');
      score.innerHTML = `<strong>Score:</strong> ${data.data[0].score}`;
      a2.appendChild(score);

      const source = document.createElement('h3');
      source.innerHTML = `<strong>Source:</strong> ${data.data[0].source}`;
      a2.appendChild(source);

      const review = document.createElement('h3');
      review.innerHTML = `<strong>Review:</strong> ${data.data[0].review}`;
      a2.appendChild(review);


      const trailer = document.createElement('a');
      trailer.classList.add("gallery");
      trailer.innerHTML = "GAllery";
      trailer.addEventListener('DOMContentLoaded', () => {
        trailer.href = `gallery.html?title=${encodeURIComponent(title)}`;
      });
      a2.appendChild(trailer);



      const moreContainer = document.createElement('div');
      moreContainer.classList.add('morecontainer')

      const synopsis = document.createElement('p');
      synopsis.classList.add('anime-synopsis');
      synopsis.innerHTML = `<u><strong>Synopsis:<strong></u> ${data.data[0].synopsis}`;
      moreContainer.appendChild(synopsis);
      const readmore = document.createElement('span');
      readmore.classList.add('more');
      moreContainer.appendChild(readmore);
      readmore.addEventListener('click', function () {
        moreContainer.classList.toggle('active');
      });
      a2.appendChild(moreContainer);



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
const t = title;
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

      const listcontainer = document.getElementById('list-container');
      const Content = document.getElementById('character-container');
      const Expand = document.querySelector('.expand');
      Expand.addEventListener('click', function () {
        listcontainer.classList.toggle('active');
        if (Content.style.maxHeight) {
          Content.style.maxHeight = null;
        } else {
          Content.style.maxHeight = Content.scrollHeight + "px";
        }
      });

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



// document.addEventListener('DOMContentLoaded', () => {
//   const galleryElement = document.getElementsById('gallery');
//   const anchorElement = document.createElement('a');
//   anchorElement.href = `gallery.html?title=${encodeURIComponent(title)}`;
//   anchorElement.innerHTML = 'Gallery';
//   galleryElement.appendChild(anchorElement);
// });