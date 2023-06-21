fetch('https://api.jikan.moe/v4/top/anime')
  .then(res=>{
    return res.json();
  })
  .then(data=>{
    console.log(data);
  })
  .catch(error=>console.log(error));