import { sceneLayers, baseLayers } from './mapLayers.js'
import sources from './mapSources.js'
import customMap from './map.js'
import * as utils from './sceneUtils.js'

// get elements
const scenes = document.querySelectorAll('.scene')
const scrollNav = document.getElementById('scroll-story-nav-ul').children
const topNav = document.getElementById('top-nav')
const mapContainer = document.getElementById('map')

// get navigable nav els
const scrollNavBtns = Array.from(scrollNav).filter(el => el.nodeName != 'HR')

// set up scene variables
const l = scenes.length
const sceneObjs = []
const mapOffset = topNav.offsetHeight
const gap = `calc(100vh - ${mapOffset}px)`
let mapLoaded = false

mapContainer.style.height = gap
mapContainer.style.top = mapOffset + 'px'

const map = customMap(mapContainer)

map.on('load', () => {
    for(const source in sources) map.addSource(source, sources[source])
    for(const layer in baseLayers) map.addLayer(baseLayers[layer], 'road-label')
    
    mapLoaded = true
})

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
        let interval;

        switch(mapId) {
            case 'bufferOneScene':
            case 'bufferTwoScene':
                interval = setInterval(() => {
                    if(mapLoaded) {
                        toggleBufferView(map, mapId)
                        clearInterval(interval)
                    }
                }, 75)
                break
            case 'noMap':
                // exit case
                break
            default:
                interval = setInterval(() => {
                    if(mapLoaded) {
                        toggleMapView(map, mapId)
                        clearInterval(interval)
                    }
                }, 75)
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

const toggleMapView = (map, sceneId) => {
    const isMobile = window.innerWidth < 750 ? true : false
    const mapSceneLayer = sceneLayers[sceneId]

    const zoom = isMobile ? mapSceneLayer.zoomMobile : mapSceneLayer.zoom
    const center = isMobile ? mapSceneLayer.centerMobile : mapSceneLayer.center
    const layers = mapSceneLayer.layers
    const hideLayers = mapSceneLayer.hideLayers
    
    // add layers & apply filters
    layers.forEach(layer => {
        const layerID = layer.id
        const filter = layer.filter || null
        
        if(!map.getLayer(layerID)) {
            map.addLayer(layer, 'road-label')
        }

        map.setFilter(layerID, filter)
        map.setLayoutProperty(layerID, 'visibility', 'visible')
    })

    // hide extra layers
    hideLayers.forEach(layer => {
        if(map.getLayer(layer)) {
            map.setLayoutProperty(layer, 'visibility', 'none')
        }
    })

    map.flyTo({
        center: center,
        zoom: zoom,
        speed: 0.4,
        curve: 2
    })
}

// buffers only remove linework
const toggleBufferView = (map, sceneId) => {
    const mapSceneLayer = sceneLayers[sceneId]
    const hideLayers = mapSceneLayer.hideLayers

    hideLayers.forEach(layer => {
        if(map.getLayer(layer)) {
            map.setLayoutProperty(layer, 'visibility', 'none')
        }
    })
}

export default sceneObjs