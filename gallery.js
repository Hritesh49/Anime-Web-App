// Retrieve the title from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title');

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


fetch(`https://api.jikan.moe/v4/anime/${dip}/pictures`)
  .then(response => response.json())
  .then(data => {
    // Process the data
    console.log(data);
    console.log(data.data.length);
    const imageContainer = document.getElementById('imageContainer');
    for (let i = 0; i < data.data.length; i++) {
      console.log(data.data[i].jpg.large_image_url);

      var imgElement = document.createElement('img');
      imgElement.src = data.data[i].jpg.large_image_url;
      imgElement.classList.add = "item";
      imageContainer.appendChild(imgElement);


    }
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });

  const apiUrl = `https://api.jikan.moe/v4/anime/${dip}/videos`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const resultContainer = document.getElementById("result-container");
      const trailerContainer = document.getElementById("trailer-container");
  
  
      const promoTrailers = data.data.promo;
      if (promoTrailers.length == 0) {
        trailerContainer.innerHTML += "<h1>No trailer available</h1>";
      } else {
        const embedUrl = promoTrailers[0].trailer.embed_url;
        const videoElement = createYouTubeVideo(embedUrl);
        trailerContainer.appendChild(videoElement);
      }
  
      const musicVideos = data.data.music_videos;
      if (musicVideos.length == 0) {
        resultContainer.innerHTML += "<h1>No music videos available</h1>";
      } else {
        for (let i = 0; i < musicVideos.length; i++) {
          const embedUrl = musicVideos[i].video.embed_url;
          const videoElement = createYouTubeVideo(embedUrl);
          resultContainer.appendChild(videoElement);
        }
      }
    })
  
    .catch(error => {
      // Handle any errors
      console.error('Error:', error);
    });
  
  function createYouTubeVideo(embedUrl) {
    const videoId = extractVideoIdFromUrl(embedUrl);
    const videoElement = document.createElement("iframe");
    videoElement.src = `https://www.youtube.com/embed/${videoId}`;
    videoElement.setAttribute("allowfullscreen", "true");
    videoElement.classList.add("centered-video");
    return videoElement;
  }
  
  function extractVideoIdFromUrl(url) {
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w\-]{11})/i);
    return (videoIdMatch && videoIdMatch[1]) || "";
  }
  