fetch('https://api.jikan.moe/v4/top/anime')
  .then(response => response.json())
  .then(data => {
    const topAnime = data.data;

    const animeContainer = document.getElementById('anime-container');

    const row = document.createElement('div');
    row.classList.add('anime-row');

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
