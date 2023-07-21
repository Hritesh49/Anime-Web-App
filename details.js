
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

      // const review = document.createElement('h3');
      // review.innerHTML = `<strong>Review:</strong> ${data.data[0].review}`;
      // a2.appendChild(review);
      const review = document.createElement('h3');
      review.innerHTML = `<strong>Review:</strong> ${data.data[0].review}`;
      a2.appendChild(review);

      const otherPageLink = document.createElement('a');
      otherPageLink.classList.add("trailer");
      otherPageLink.innerHTML = "Click to Watch Trailer";
      otherPageLink.href = `gallery.html?title=${encodeURIComponent(data.data[0].title)}`;
      a2.appendChild(otherPageLink);


      // const trailer = document.createElement('a');
      // trailer.classList.add("gallery");
      // trailer.innerHTML = "GAllery";
      // trailer.addEventListener('DOMContentLoaded', () => {
      //   trailer.href = `gallery.html?title=${encodeURIComponent(title)}`;
      // });
      // a2.appendChild(trailer);

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


async function fetchAnime(title) {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${title}`);
    const data = await response.json();
    const mId = data.data[0].mal_id;
    return mId;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
}

const mId = await fetchAnime(title);
const dip = mId;
console.log(dip);
function animeCharacters(dip) {
  fetch(`https://api.jikan.moe/v4/anime/${dip}/characters`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Get the character list element
      const characterList = document.getElementById('character-list');
      console.log(data.data.length);
      // Get the character list element
      for (let i = 0; i < data.data.length; i++) {
        //  console.log(data.data[i].character.images.jpg.image_url);
        //  console.log(data.data[i].character.name);
        //  console.log(data.data[i].role);

        // Display each character's name and image
        const listItem = document.createElement('li');

        // Create an image element
        const image = document.createElement('img');
        image.src = data.data[i].character.images.jpg.image_url;
        // image.alt = character.node.name.full;
        listItem.appendChild(image);

        // Create a span element for the character name
        const nameSpan = document.createElement('span');
        nameSpan.textContent = data.data[i].character.name;
        listItem.appendChild(nameSpan);

        characterList.appendChild(listItem);

      }
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

    })
    .catch(error => { console.log("error:", error) });
}

function throttle(fn, delay) {
  let lastCallTime = 0;
  let timeoutId;

  return function (...args) {
    const now = new Date().getTime();
    const timeSinceLastCall = now - lastCallTime;

    if (timeSinceLastCall >= delay) {
      fn.apply(this, args);
      lastCallTime = now;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn.apply(this, args);
        lastCallTime = new Date().getTime();
      }, delay - timeSinceLastCall);
    }
  };
}
const throttledFetchAnimeCharacters = throttle(animeCharacters, 10000);

throttledFetchAnimeCharacters(dip);

function reviews(dip)
{
  fetch(`https://api.jikan.moe/v4/anime/${dip}/reviews`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data.data.length < 1 || data.data.length == null) {
      
      const reviewsContainer = document.getElementById('reviewsContainer');
      reviewsContainer.innerHTML = `<h2>No Reviews available for ${title}</h2>`;
    }
    else {
      const reviewsContainer = document.getElementById('reviewsContainer');
      reviewsContainer.innerHTML = `<h2>Reviews for ${title}:</h2>`;
      
      
      for (let i = 0; i < data.data.length; i++) {
        console.log(data.data[i].user.username);
        const rating = data.data[i].score;
        const summary = data.data[i].review;
        const user = data.data[i].user.username;
        const reviewContainer = document.createElement('div');
        reviewContainer.classList.add("reviewcontainer");
          const reviewElement = document.createElement('p');
          reviewElement.classList.add("reviewelement");
          reviewElement.innerHTML = `
          <strong>User:</strong> ${user}<br>
          <strong>Rating:</strong> ${rating}<br>
          <strong>Summary:</strong> ${summary}<br><br>
          `;
          reviewContainer.appendChild(reviewElement);
          const showmore = document.createElement('span');
          showmore.classList.add('showmore');
          reviewContainer.appendChild(showmore);
          showmore.addEventListener('click', function () {
            reviewContainer.classList.toggle('active');
          });
          reviewsContainer.appendChild(reviewContainer);
        }
      }
    })
    .catch(error => { console.log("error:", error) });
  }
  
  
  
const throttledFetchAnimeReviews = throttle(reviews, 10000);
throttledFetchAnimeReviews(dip);