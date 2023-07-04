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
const dip=mId;
console.log(dip);


fetch(`https://api.jikan.moe/v4/anime/${dip}/pictures`)
.then(response => response.json())
.then(data => {
  // Process the data
  console.log(data);
  console.log(data.data.length);
  const imageContainer = document.getElementById('imageContainer');
  for(let i=0;i<data.data.length;i++){
    console.log(data.data[i].jpg.large_image_url);
   
var imgElement = document.createElement('img');
imgElement.src = data.data[i].jpg.large_image_url;
imgElement.classList.add="item";
imageContainer.appendChild(imgElement);


}
})
.catch(error => {
// Handle any errors
console.error('Error:', error);
});

