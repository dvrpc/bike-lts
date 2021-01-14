import sceneObjs from './scenes.js'
import { customStyles } from './map.js'

const mapContainer = document.getElementById('map')

//***** handle scroll story
// init controller
const controller = new ScrollMagic.Controller();

// add scenes to controller
sceneObjs.forEach(scene => scene.addTo(controller))
//***** END scroll story



//***** handle map
mapboxgl.accessToken = 'pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA'
const map = new mapboxgl.Map({
    container: mapContainer,
    style: customStyles,
    attributionsControl: false,
    center: [-75.2273, 40.071],
    zoom: 3
})
map.fitBounds([[-76.09405517578125, 39.49211914385648],[-74.32525634765625,40.614734298694216]]);
//***** END map