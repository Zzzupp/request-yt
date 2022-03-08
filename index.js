let catchedText = '';



const form = document.querySelector('form');
const button = document.querySelector('button');
form.addEventListener('submit', (event) => {

  let inputText = document.querySelector('#inputSearch').value;
  event.preventDefault()
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBfLZ_adxwgcoUDMmnb2th3A94sMsabgKg&q=${inputText}&type=video`)
    .then((response) => response.json())
    .then((data) => {
      render(data)
    })
})

let main = document.querySelector('#maincont');
let footer = document.querySelector('#footercont');




function render(data) {
  footer.innerHTML = '';
  let videoItems = data.items;
  console.log(videoItems)
  let firstItem = videoItems[0];
  let firstVideo = firstItem.id.videoId;
  console.log(firstItem.snippet.title)

  renderMain = `
  <iframe width="560" height="315" src="https://www.youtube.com/embed/${firstVideo}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  `
  main.innerHTML = (renderMain)

  for (let i = 1; i <= videoItems.length - 1; i++) {
    let selectInput = videoItems[i];
    let photoSelect = selectInput.snippet.thumbnails.medium.url;
    console.log(photoSelect)
    renderFooter = `
    <img src="${photoSelect}" alt="qwe" class='img-fot'>
    `
    footer.innerHTML += (renderFooter)
  }
  let previves = document.querySelectorAll('.img-fot')
  previves.forEach(previev => {
    previev.addEventListener('click', event => {
      console.log(previev.src)
      let currentScr = previev.src.slice(23, -14);
      console.log(currentScr)
      renderMainRepeated = `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${currentScr}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      `
      main.innerHTML = renderMainRepeated;
    })
  })


}