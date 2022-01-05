import { sceneLayers, baseLayers } from './mapLayers.js'
import sources from './mapSources.js'
import customMap from './map.js'
import * as utils from './sceneUtils.js'

// get elements
const scenes = document.querySelectorAll('.scene')
const scrollNav = document.getElementById('scroll-story-nav-ul').children
const topNav = document.getElementById('top-nav')

// @update
const mapContainer = document.getElementById('map')

// @update
// const mapTwoContainer = document.getElementById('map-2')
// const mapThreeContainer = document.getElementById('map-3')

// get navigable nav els
const scrollNavBtns = Array.from(scrollNav).filter(el => el.nodeName != 'HR')

// set up scene variables
const l = scenes.length
const sceneObjs = []
const mapOffset = topNav.offsetHeight

// @update
// const mapDivs = [mapContainer, mapTwoContainer, mapThreeContainer]

// @update
// handle maps
// mapDivs.forEach(map => {
//     const gap = `calc(100vh - ${mapOffset}px)`
    
//     map.style.height = gap
//     map.style.top = mapOffset + 'px'
// })

const gap = `calc(100vh - ${mapOffset}px)`
mapContainer.style.height = gap
mapContainer.style.top = mapOffset + 'px'
const map = customMap(mapContainer)


// @update
// const maps = {
    // stress: {
    //     map: customMap(mapContainer),
    //     loaded: false
    // },
    // @update
    // connectivity: {
    //     map: customMap(mapTwoContainer),
    //     loaded: false
    // },
    // special: {
    //     map: customMap(mapThreeContainer),
    //     loaded: false
    // },
// }

// @update
let mapLoaded = false

// @update
// for(const map in maps) {
//     const mapInstance = maps[map].map

//     mapInstance.on('load', () => {
//         for(const source in sources) mapInstance.addSource(source, sources[source])
//         for(const layer in baseLayers) mapInstance.addLayer(baseLayers[layer], 'road-label')

//         maps[map].loaded = true
//     })
// }

// @update
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

            switch(mapId) {
                case 'bufferOneScene':
                case 'bufferTwoScene':
                    // toggleBufferView(map, mapId)
                    console.log('BUFFERS for scene ', mapId)
                    break
                case 'noMap':
                    console.log('EXIST CASE ', mapId)
                    break
                default:
                    console.log('DEFAULT for scene ', mapId)
                    let interval = setInterval(() => {
                        if(mapLoaded) {
                            // toggleMapView(map, mapId)
                            clearInterval(interval)
                        }
                    }, 150)
            }

            // @update unneeded
            // const mapDiv = utils.getMapCategory(scene)

            // // @UPDATE can do away with the whole map-category set
            // // one map just needs to reference toggleMapView() with scene id and done. layers are there
            // // @UPDATE in mapLayers consolidate all layers into one object
            // const mapCategory = mapDiv.dataset.mapCategory
            
            // // @TODO remove this interval b/c logic will go in map.on('load')
            // let interval = setInterval(() => {
            //     // @update: b/c just one map, all logic _could_ be moved into map.on('load', () => {})
            //     if(mapLoaded) {
            //         // @update invoked toggleMapView(map, mapId) after if(ma)
            //         toggleMapView(map, mapId)
            //         clearInterval(interval)
            //     }
            //     // @update
            //     // if(maps[mapCategory].loaded) {
            //     //     toggleMapView(mapCategory, mapId)
            //     //     clearInterval(interval)
            //     // }
            // }, 250)
        // }
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

// @update
// const toggleMapView = (mapCat, sceneId) => {
const toggleMapView = (map, sceneId) => {
    const isMobile = window.innerWidth < 750 ? true : false

    // Wupdate
    // const mapInstance = maps[mapCat].map
    // @update
    // const mapSceneLayer = sceneLayers[mapCat][sceneId]
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

// buffers keep map in place but remove linework
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