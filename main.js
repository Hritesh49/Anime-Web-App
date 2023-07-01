const mountainLeft = document.querySelector('#mountain_left');
const mountainRight = document.querySelector('#mountain_right');
const cloud1 = document.querySelector('#clouds_1');
const cloud2 = document.querySelector('#clouds_2');
const text = document.querySelector('#text');
const man = document.querySelector('#man');
// const arrow = document.querySelector('#arrow');

window.addEventListener('scroll', () => {
  let value = scrollY;
  mountainLeft.style.left = `-${value / 0.7}px`;
  cloud2.style.left = `-${value * 2}px`;
  mountainRight.style.left = `${value / 0.7}px`;
  cloud1.style.left = `${value * 2}px`;
  text.style.bottom = `-${value}px`;
  // arrow.style.bottom = `-${value}px`;
});



// Function to fetch anime details by title search
function fetchAnimeDetails(title, id) {
  fetch(`https://api.jikan.moe/v4/anime?q=${title}`)
    .then((response) => response.json())
    .then((data) => {

      const animeContainer = document.querySelector('.anime-row.search');
      animeContainer.innerHTML = '';

      const backButton = document.createElement('button');
      backButton.classList.add('backbtn');
      backButton.textContent = 'Back';
      backButton.addEventListener('click', () => {
        animeContainer.innerHTML = '';
        displayTopAnime();
        displayUpcomingSeason();
        dispalyAnimeNow();

        const upcomingAnimeContainer = document.querySelector('.anime-row.upcoming');
        upcomingAnimeContainer.style.display = 'flex';
          
        const nowAnimeContainer = document.querySelector('.anime-row.now');
        nowAnimeContainer.style.display = 'flex';

        const heading = document.querySelector('#myHeading');
        const upcomingHeading = document.querySelector('#upcomingHeading');
        const nowHeading = document.querySelector('#nowHeading');

        heading.style.display = 'block';
        upcomingHeading.style.display = 'block';
        nowHeading.style.display = 'block';
        const nowdiv = document.querySelector('.nowdiv');
        nowdiv.style.display='flex'
        const upcoming = document.querySelector('.upcomingdiv')
        upcoming.style.display='flex'
        const top = document.querySelector('.topdiv')
        top.style.display='flex'
      });
      animeContainer.appendChild(backButton);


      if (data.data.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No results found.';
        animehContainer.appendChild(noResultsMessage);
      } else {
        data.data.forEach((anime) => {
          const animesearchCard = createAnimesearchCard(anime);
          animeContainer.appendChild(animesearchCard);
        });
      }
      const heading = document.querySelector('#myHeading');
      const upcomingHeading = document.querySelector('#upcomingHeading');
      const nowHeading = document.querySelector('#nowHeading');

      heading.style.display = 'none';
      upcomingHeading.style.display = 'none';
      nowHeading.style.display = 'none';
      // Hide upcoming anime container
      const upcomingAnimeContainer = document.querySelector('.anime-row.upcoming');
      upcomingAnimeContainer.style.display = 'none';
      const now = document.querySelector('.now');
      now.style.display='none'
      const nowdiv = document.querySelector('.nowdiv');
      nowdiv.style.display='none'
      const upcoming = document.querySelector('.upcomingdiv')
      upcoming.style.display='none'
      const top= document.querySelector('.topdiv')
      top.style.display='none'
    })

    .catch((error) => {
      console.log('Error fetching anime details:', error);
    });
}

// Function to display the top anime
function displayTopAnime() {
  const animeContainer = document.querySelector('.anime-row.content');
  animeContainer.innerHTML = '';

  fetch('https://api.jikan.moe/v4/top/anime')
    .then((response) => response.json())
    .then((data) => {
      const topAnime = data.data.slice(0, 40);

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
function createAnimeNowcard(anime) {
  const animeNowcard = document.createElement('div');
  animeNowcard.classList.add('anime-nowcard');

  // Create anchor tag for the image
  const imageLink = document.createElement('a');
  imageLink.href = `details.html?title=${encodeURIComponent(anime.title)}`;

  const image = document.createElement('img');
  image.classList.add('anime-image');
  image.src = anime.images.jpg.image_url;
  image.alt = anime.title;
  imageLink.appendChild(image);

  animeNowcard.appendChild(imageLink);

  const title = document.createElement('div');
  title.classList.add('anime-title');
  title.textContent = anime.title;
  animeNowcard.appendChild(title);

  const score = document.createElement('div');
  score.classList.add('anime-score');
  score.textContent = `Score: ${anime.score}`;
  animeNowcard.appendChild(score);

  const episodes = document.createElement('div');
  episodes.classList.add('anime-episodes');
  episodes.textContent = `Episodes: ${anime.episodes}`;
  animeNowcard.appendChild(episodes);

  return animeNowcard;
}

function createAnimesearchCard(anime) {
  const animesearchCard = document.createElement('div');
  animesearchCard.classList.add('anime-searchcard');

  // Create anchor tag for the image
  const imageLink = document.createElement('a');
  imageLink.href = `details.html?title=${encodeURIComponent(anime.title)}`;

  const image = document.createElement('img');
  image.classList.add('anime-image');
  image.src = anime.images.jpg.image_url;
  image.alt = anime.title;
  imageLink.appendChild(image);

  animesearchCard.appendChild(imageLink);

  const title = document.createElement('div');
  title.classList.add('anime-title');
  title.textContent = anime.title;
  animesearchCard.appendChild(title);

  const score = document.createElement('div');
  score.classList.add('anime-score');
  score.textContent = `Score: ${anime.score}`;
  animesearchCard.appendChild(score);

  const episodes = document.createElement('div');
  episodes.classList.add('anime-episodes');
  episodes.textContent = `Episodes: ${anime.episodes}`;
  animesearchCard.appendChild(episodes);

  return animesearchCard;
}
function createAnimeNowcard(anime) {
  const animeNowcard = document.createElement('div');
  animeNowcard.classList.add('anime-nowcard');

  // Create anchor tag for the image
  const imageLink = document.createElement('a');
  imageLink.href = `details.html?title=${encodeURIComponent(anime.title)}`;

  const image = document.createElement('img');
  image.classList.add('anime-image');
  image.src = anime.images.jpg.image_url;
  image.alt = anime.title;
  imageLink.appendChild(image);

  animeNowcard.appendChild(imageLink);

  const title = document.createElement('div');
  title.classList.add('anime-title');
  title.textContent = anime.title;
  animeNowcard.appendChild(title);

  const score = document.createElement('div');
  score.classList.add('anime-score');
  score.textContent = `Score: ${anime.score}`;
  animeNowcard.appendChild(score);

  const episodes = document.createElement('div');
  episodes.classList.add('anime-episodes');
  episodes.textContent = `Episodes: ${anime.episodes}`;
  animeNowcard.appendChild(episodes);

  return animeNowcard;
}


function createAnimeUpcard(anime) {
  const animeUpcard = document.createElement('div');
  animeUpcard.classList.add('anime-upcard');

  // Create anchor tag for the image
  const imageLink = document.createElement('a');
  imageLink.href = `details.html?title=${encodeURIComponent(anime.title)}`;

  const image = document.createElement('img');
  image.classList.add('anime-image');
  image.src = anime.images.jpg.image_url;
  image.alt = anime.title;
  imageLink.appendChild(image);

  animeUpcard.appendChild(imageLink);

  const title = document.createElement('div');
  title.classList.add('anime-title');
  title.textContent = anime.title;
  animeUpcard.appendChild(title);
  return animeUpcard;
}

const upcoming = document.querySelector('.upcoming');
const Left = document.querySelector('.upcomingleft');
const Right = document.querySelector('.upcomingright');

upcoming.addEventListener("wheel", (evt) => {
  // evt.preventDefault();
  upcoming.scrollLeft += evt.deltaY;
});
Left.addEventListener("click", ()=>{
  upcoming.style.scrollBehaviour = "smooth";
  upcoming.scrollLeft -= 300; 
});
Right.addEventListener("click", ()=>{
  upcoming.style.scrollBehaviour = "smooth";
  upcoming.scrollLeft += 300; 
});

const content = document.querySelector('.content');
const TopLeft = document.querySelector('.topleft');
const TopRight = document.querySelector('.topright');

content.addEventListener("wheel", (evt) => {
  // evt.preventDefault();
  content.scrollLeft += evt.deltaY;
});
TopLeft.addEventListener("click", ()=>{
  content.style.scrollBehaviour = "smooth";
  content.scrollLeft -= 300; 
});
TopRight.addEventListener("click", ()=>{
  content.style.scrollBehaviour = "smooth";
  content.scrollLeft += 300; 
});


const now = document.querySelector('.now');
const NowLeft = document.querySelector('.nowleft');
const NowRight = document.querySelector('.nowright');

now.addEventListener("wheel", (evt) => {
  // evt.preventDefault();
  now.scrollLeft += evt.deltaY;
});
NowLeft.addEventListener("click", ()=>{
  now.style.scrollBehaviour = "smooth";
  now.scrollLeft -= 300; 
});
NowRight.addEventListener("click", ()=>{
  now.style.scrollBehaviour = "smooth";
  now.scrollLeft += 300; 
});


function displayUpcomingSeason() {
  const animeContainer = document.querySelector('.anime-row.upcoming');
  animeContainer.innerHTML = '';

  fetch('https://api.jikan.moe/v4/seasons/upcoming')
    .then((response) => response.json())
    .then((data) => {
      const upcomingAnime = data.data.slice(0, 40);

      upcomingAnime.forEach((anime) => {
        const animeUpcard = createAnimeUpcard(anime);
        animeContainer.appendChild(animeUpcard);
      });
    })
    .catch((error) => {
      console.log('Error fetching upcoming season:', error);
    });
}
// function to create new anime card element
function dispalyAnimeNow(){
  const animeContainer= document.querySelector('.anime-row.now');
  animeContainer.innerHTML='';
   fetch('https://api.jikan.moe/v4/seasons/now')
   .then((response)=>response.json())
   .then((data) => {
    const nowAnime = data.data.slice(0, 20);

    nowAnime.forEach((anime) => {
      const animeNowcard = createAnimeNowcard(anime);
      animeContainer.appendChild(animeNowcard);
    });
  })
  .catch((error) => {
    console.log('Error fetching now season:', error);
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
dispalyAnimeNow();
// Retrieve the title from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title');

// Fetch anime details using the title
if (title) {
  fetchAnimeDetails(title);
}