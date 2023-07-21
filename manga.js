let BottomG = document.getElementById("backtotop");
window.onscroll = function(){scrolltoTop()};
function scrolltoTop() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    BottomG.style.display = "block";
    BottomG.classList.add("show");
  } else {
    BottomG.style.display = "none";
    BottomG.classList.remove("show");
  }
}
BottomG.onclick = function(){BacktoTop()};
function BacktoTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const MangaDiv = document.getElementById('mangadiv');
      const Content = document.querySelector('.manga-container');
      const Expand = document.querySelector('.expand');
      Expand.addEventListener('click', function () {
        MangaDiv.classList.toggle('active');
        if (Content.style.maxHeight) {
          Content.style.maxHeight = null;
        } else {
          Content.style.maxHeight = Content.scrollHeight + "px";
        }
      });
  
  
  // Fetch data from the API
  fetch('https://api.jikan.moe/v4/top/manga')
  .then(response => response.json())
  .then(data => {
    const mangaContainer = document.querySelector('.manga-container');
    
    // Loop through the manga data and create a card for each manga
    data.data.forEach(manga => {
      const mangaCard = document.createElement('div');
      mangaCard.classList.add('manga-card');
      
      const image = document.createElement('img');
      image.src = manga.images.jpg.large_image_url;
      image.alt = manga.title;
      
      const title = document.createElement('h2');
      title.textContent = manga.title;
      
      const type = document.createElement('p');
      type.textContent = `Type: ${manga.type}`;
      
      const chapters = document.createElement('p');
      chapters.textContent = `Chapters: ${manga.chapters}`;
      
      const status = document.createElement('p');
      status.textContent = `Status: ${manga.status}`;
      
      
      mangaCard.appendChild(image);
      mangaCard.appendChild(title);
      mangaCard.appendChild(type);
      mangaCard.appendChild(chapters);
      mangaCard.appendChild(status);
     
      
      mangaContainer.appendChild(mangaCard);
    });
  })
 

  