import sceneObjs from './scenes.js'
import { customStyles } from './map.js'

const mapContainer = document.getElementById('map')
const mapTwoContainer = document.getElementById('map-2')

//***** handle scroll story
// init controller
const controller = new ScrollMagic.Controller();

// add scenes to controller
sceneObjs.forEach(scene => scene.addTo(controller))
//***** END scroll story



//***** handle maps
const containers = [mapContainer, mapTwoContainer]
mapboxgl.accessToken = 'pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA'
containers.forEach(container => {
    const map = new mapboxgl.Map({
        container: container,
        style: customStyles,
        attributionsControl: false,
        center: [-75.2273, 40.071],
        zoom: 3,
        interactive: false
    })

    map.fitBounds([[-76.09405517578125, 39.49211914385648],[-74.32525634765625,40.614734298694216]]);
})
//***** END map

// @TODO multiple maps
    // map 1: regional + low-stress islands
    // map 2: connectivity analysis + connectivity priorities
    // map 3: special designations
// alternate alignment i.e. map 1 & 3 have map left, text right while 2 has map right, text left