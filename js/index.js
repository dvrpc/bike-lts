import sceneObjs from './scenes.js'
import customMap from './map.js'

const mapContainer = document.getElementById('map')
const mapTwoContainer = document.getElementById('map-2')
const mapThreeContainer = document.getElementById('map-3')

// init controller & add scenes
const controller = new ScrollMagic.Controller();
sceneObjs.forEach(scene => scene.addTo(controller))

//***** handle maps
const containers = [mapContainer, mapTwoContainer, mapThreeContainer]
containers.forEach(container => customMap(container))