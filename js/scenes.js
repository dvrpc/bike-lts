import { sceneLayers, baseLayers } from './mapLayers.js'
import sources from './mapSources.js'
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
    stress: {
        map: customMap(mapContainer),
        loaded: false
    },
    connectivity: {
        map: customMap(mapTwoContainer),
        loaded: false
    },
    special: {
        map: customMap(mapThreeContainer),
        loaded: false
    },
}

for(const map in maps) {
    const mapInstance = maps[map].map

    mapInstance.on('load', () => {
        for(const source in sources) mapInstance.addSource(source, sources[source])
        for(const layer in baseLayers) mapInstance.addLayer(baseLayers[layer])
        
        maps[map].loaded = true
    })
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
            
            let interval = setInterval(() => {
                if(maps[mapCategory].loaded) {
                    toggleMapView(mapCategory, mapId)
                    clearInterval(interval)
                }
            }, 250)
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
    const mapInstance = maps[mapCat].map
    const mapSceneLayer = sceneLayers[mapCat][sceneId]

    const zoom = mapSceneLayer.zoom
    const center = mapSceneLayer.center
    const layers = mapSceneLayer.layers
    const hideLayers = mapSceneLayer.hideLayers
    
    // @TODO remove previous scene layer
    // b/c it's 3 instances per analysis, removing might not even be needed.
    // just a matter of applying existing filters etc
    
    // add layers & apply filters
    layers.forEach(layer => {
        const layerID = layer.id
        const filter = layer.filter || null
        
        if(!mapInstance.getLayer(layerID)) {
            mapInstance.addLayer(layer)
        }

        mapInstance.setFilter(layerID, filter)
        mapInstance.setLayoutProperty(layerID, 'visibility', 'visible')
    })

    // hide extra layers
    hideLayers.forEach(layer => {
        if(mapInstance.getLayer(layer)) {
            mapInstance.setLayoutProperty(layer, 'visibility', 'none')
        }
    })

    mapInstance.flyTo({
        center: center,
        zoom: zoom,
        speed: 0.4,
        curve: 2
    })
}

export default sceneObjs