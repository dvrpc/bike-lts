import { sceneLayers, baseLayers } from './mapLayers.js'
import sources from './mapSources.js'
import customMap from './map.js'
import * as utils from './sceneUtils.js'

// get elements
const scenes = document.querySelectorAll('.scene')
const scrollNav = document.getElementById('scroll-story-nav-ul').children
const topNav = document.getElementById('top-nav')

// const mapContainer = document.getElementById('map')
const map = document.getElementById('map')

const mapTwoContainer = document.getElementById('map-2')
const mapThreeContainer = document.getElementById('map-3')

// get navigable nav els
const scrollNavBtns = Array.from(scrollNav).filter(el => el.nodeName != 'HR')

// set up scene variables
const l = scenes.length
const sceneObjs = []
const mapOffset = topNav.offsetHeight
const mapDivs = [mapContainer, mapTwoContainer, mapThreeContainer]

// handle maps
// mapDivs.forEach(map => {
//     const gap = `calc(100vh - ${mapOffset}px)`
    
//     map.style.height = gap
//     map.style.top = mapOffset + 'px'
// })

    const gap = `calc(100vh - ${mapOffset}px)`
    
    map.style.height = gap
    map.style.top = mapOffset + 'px'

const maps = {
    stress: {
        map: customMap(mapContainer),
        loaded: false
    },
    // connectivity: {
    //     map: customMap(mapTwoContainer),
    //     loaded: false
    // },
    // special: {
    //     map: customMap(mapThreeContainer),
    //     loaded: false
    // },
}

for(const map in maps) {
    const mapInstance = maps[map].map

    mapInstance.on('load', () => {
        for(const source in sources) mapInstance.addSource(source, sources[source])
        for(const layer in baseLayers) mapInstance.addLayer(baseLayers[layer], 'road-label')
        
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
    const isMobile = window.innerWidth < 750 ? true : false
    const mapInstance = maps[mapCat].map
    const mapSceneLayer = sceneLayers[mapCat][sceneId]

    const zoom = isMobile ? mapSceneLayer.zoomMobile : mapSceneLayer.zoom
    const center = isMobile ? mapSceneLayer.centerMobile : mapSceneLayer.center
    const layers = mapSceneLayer.layers
    const hideLayers = mapSceneLayer.hideLayers
    
    // add layers & apply filters
    layers.forEach(layer => {
        const layerID = layer.id
        const filter = layer.filter || null
        
        if(!mapInstance.getLayer(layerID)) {
            mapInstance.addLayer(layer, 'road-label')
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