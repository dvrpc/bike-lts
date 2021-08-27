import { sceneLayers } from './mapLayers.js'
import customMap from './map.js'
import * as utils from './sceneUtils.js'

// get elements
const scenes = document.querySelectorAll('.scene-section')
const scrollNav = document.getElementById('scroll-story-nav-ul').children
const mapContainer = document.getElementById('map')
const mapTwoContainer = document.getElementById('map-2')
const mapThreeContainer = document.getElementById('map-3')

// set up scene variables
const l = scenes.length
const sceneObjs = []

// get navigable nav els
const scrollNavBtns = Array.from(scrollNav).filter(el => el.nodeName != 'HR')

// create and store map instances
const maps = {
    stress: customMap(mapContainer),
    connectivity: customMap(mapTwoContainer),
    special: customMap(mapThreeContainer)
}

// create scene objects
for(let i = 0; i < l; i++) {
    const scene = scenes[i]
    const mapId = scene.dataset.mapId

    sceneObjs.push( new ScrollMagic.Scene({
        duration: 200,
        triggerElement: scene,
        reverse: true
    })
    .on('enter', () => {
        utils.toggleAnimation(scene)
        utils.toggleNavLink(scrollNavBtns, i)

        if(mapId) {
            const mapDiv = utils.getMapCategory(scene)
            const mapCategory = mapDiv.dataset.mapCategory
            toggleMapView(mapCategory, mapId)
        }
    }))
}

// add scroll nav hover effects
scrollNavBtns.forEach(btn => {
    let tooltip;

    btn.onmouseover = e => {
        tooltip = utils.makeNavTooltip(e)
        btn.insertAdjacentElement('afterend', tooltip)
    }

    btn.onmouseout = () => utils.removeNavTooltip(tooltip)
})

const toggleMapView = (mapCat, sceneId) => {
    let mapInstance;
    let mapSceneLayer;

    // get correct map instance & layer information for map scene
    switch(mapCat) {
        case 'connectivity':
            mapInstance = maps.connectivity
            mapSceneLayer = sceneLayers.connectivity[sceneId]
            break
        case 'special':
            mapInstance = maps.special
            mapSceneLayer = sceneLayers.special[sceneId]
            break
        default:
            mapInstance = maps.stress
            mapSceneLayer = sceneLayers.stress[sceneId]
    }

    const zoom = mapSceneLayer.zoom
    const center = mapSceneLayer.center
    const layers = mapSceneLayer.layers
    
    // @TODO remove previous scene layer
    // b/c it's 3 instances per analysis, removing might not even be needed.
    // just a matter of applying existing filters etc
    
    // add layers & apply filters
    layers.forEach(layer => {
        const layerID = layer.id
        const filter = layer.filter
        
        if(!mapInstance.getLayer(layerID)) {
            mapInstance.addLayer(layer)
        }

        filter ? mapInstance.setFilter(layerID, filter) : mapInstance.setFilter(layerID, null)
    })

    mapInstance.flyTo({
        center: center,
        zoom: zoom,
        speed: 0.4,
        curve: 2
    })
}

export default sceneObjs