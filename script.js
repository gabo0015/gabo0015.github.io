const $imgs = [{
  filename: 'toronto',
  imgname: 'Toronto at night',
  datetaken: 'Date taken: 2018-11-03 <br> 7:58pm'
},
{
  filename: 'AC',
  imgname: 'Wooden Structure at AC',
  datetaken: 'Date taken: 2019-09-16 <br> 6:53pm'
},
{
  filename: 'bird',
  imgname: 'Bird in Hand',
  datetaken: 'Date taken: 2020-09-20 <br> 12:32pm'
},
{
  filename: 'acAtNight',
  imgname: 'Algonquin College at Night',
  datetaken: 'Date taken: 2019-09-16 <br> 6:59pm'
},
{
  filename: 'almonteFalls',
  imgname: 'Water Falls in Almonte',
  datetaken: 'Date taken: 2019-12-04 <br> 6:39pm'
},
{
  filename: 'berriesWinter',
  imgname: 'Frozen Berries',
  datetaken: 'Date taken: 2019-12-04 <br> 1:00pm'
},
{
  filename: 'closeUpFlowers',
  imgname: 'Close up Flowers',
  datetaken: 'Date taken: 2019-09-13 <br> 1:10pm'
},
{
  filename: 'fireParlament',
  imgname: 'Fire at Parliament Hill',
  datetaken: 'Date taken: 2019-12-03 <br> 3:45pm'
},
{
  filename: 'fireworks',
  imgname: 'Canada Day Fireworks',
  datetaken: 'Date taken: 2018-07-01 <br> 9:05pm'
},
{
  filename: 'lakeSunset',
  imgname: 'Sunset Over the Lake',
  datetaken: 'Date taken: 2018-10-10 <br> 5:09pm'
},
{
  filename: 'locksOnBridge',
  imgname: 'Locks Over the Canal',
  datetaken: 'Date taken: 2019-12-03 <br> 2:35pm'
},
{
  filename: 'mine',
  imgname: 'Old Mine Equipement',
  datetaken: 'Date taken: 2018-09-20 <br> 1:56pm'
},
{
  filename: 'oceanInBC',
  imgname: 'Storm Over the Ocean',
  datetaken: 'Date created: 2018-11-22 <br> 7:39pm'
},
{
  filename: 'oldCar',
  imgname: 'Rusting Away',
  datetaken: 'Date taken: 2018-07-30 <br> 9:46am'
},
{
  filename: 'oldMill',
  imgname: 'Almonte Old Mill Gear',
  datetaken: 'Date taken: 2019-09-25 <br> 13:38pm'
},
{
  filename: 'passingTrain',
  imgname: 'Passing Freight Train',
  datetaken: 'Date taken: 2018-03-11 <br> 6:21pm'
},
{
  filename: 'reflectedSun',
  imgname: 'Sunset of Four',
  datetaken: 'Date taken: 2018-03-13 <br> 8:13pm'
},
{
  filename: 'shipSunset',
  imgname: 'Sunset Over the Ocean',
  datetaken: 'Date taken: 2018-03-16 <br> 9:35pm'
},
{
  filename: 'trainSunset',
  imgname: 'Sunset on the Railroad',
  datetaken: 'Date taken: 2018-03-12 <br> 7:28pm'
}
]
// Array containing all the image names, alt tags, and date information

const $gallery = document.getElementById('gallery')
// variable holding the gallery div

const $imgInsert = []
// empty variable that stores the pushed array of images

for (const $imgObj of $imgs) {
  $imgInsert.push(`<picture class="picture">

  <source srcset="img/mobile/${$imgObj.filename}500x333.png 500w" media="(max-width: 650px)" sizes="100vw">


  <source srcset="img/tablet/${$imgObj.filename}700x467.png 700w" media="(max-width: 1200px)" sizes="100vw">

  <source srcset="img/desktop/${$imgObj.filename}900x600.png 900w" media="(min-width: 1200px)" sizes="100vw">

  <img src="img/original/${$imgObj.filename}.png" data-name="${$imgObj.imgname}" data-info="${$imgObj.datetaken}" class="insert-img" alt="$${$imgObj.imgname}"/>
  <h3 class="hover-text">${$imgObj.imgname}</h3>
</picture>`)
}

// creates the array of images

$gallery.innerHTML = $imgInsert.join('')
// joins the array of images to the html document

const imgLayover = document.getElementById('img-layover')
// stores the div containing the hidden image box and stores it to the variable imgLayover
const insertImg = document.getElementsByClassName('insert-img')
// to  grab image
const escape = document.getElementById('escape-btn')
// holds the escape button for the layover image
const imgDisplay = document.getElementById('img-display')
// holds the img element to add the image to the layover
const imgName = document.getElementById('img-title')
const imginfo = document.getElementById('imginfo')

const $imginfo = []
console.log($imginfo)

escape.addEventListener('click', function () {
  imgLayover.classList.remove('overlay')
  // removes the class of overlay whenm the escape button is clicked
})

for (const dispImg of insertImg) {
  dispImg.addEventListener('click', function () {
    imgLayover.classList.add('overlay')
    // ads the class of overlay to the image when clicked
    imgDisplay.src = this.src
    // takes the current image source and replaces it with the image source that is clicked on
    console.log($imginfo)
    // console.log(dispImg)
    imgName.innerHTML = this.dataset.name
    imginfo.innerHTML = this.dataset.info
    // takes the h2 containing the Image name and sets the innerHTML to the alt tag name
    // imginfo.innerHTML = $imginfo.join('')
  })
}
