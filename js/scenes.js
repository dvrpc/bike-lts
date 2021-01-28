import { sceneLayers } from './mapLayers.js'
import customMap from './map.js'

// get elements
const scenes = document.querySelectorAll('.scene-section')
const scrollNav = document.getElementById('scroll-story-nav-ul').children
const mapContainer = document.getElementById('map')
const mapTwoContainer = document.getElementById('map-2')
const mapThreeContainer = document.getElementById('map-3')

// set up scene variables
const l = scenes.length
const sceneObjs = []

// get nav els minus hr
const scrollNavBtns = Array.from(scrollNav).filter(el => el.nodeName != 'HR')

// create map instances and store in indexed object
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
    .on('enter', e => {
        toggleAnimation(e, scene)
        toggleNavLink(i)

        if(mapId) {
            const mapDiv = getMapCategory(scene)
            const mapCategory = mapDiv.dataset.mapCategory
            toggleMapView(mapCategory, mapId)
        }
    }))
}

// add scroll nav hover effects
scrollNavBtns.forEach(btn => {
    let tooltip;

    btn.onmouseover = e => {
        tooltip = makeNavTooltip(e)
        btn.insertAdjacentElement('afterend', tooltip)
    }

    btn.onmouseout = () => removeNavTooltip(tooltip)
})

// helper fncs to animate scene in/out, update side-nav link state and update map (when applicable)
const toggleAnimation = (e, el) => {
    const text = el.children[1] ? el.children[1] : el.children[0]
    text.classList.add('fadein')
}
const toggleNavLink = i => {
    // remove active class from all links
    scrollNavBtns.forEach(btn => btn.classList.remove('scroll-story-nav-link-active'))

    // add active class to current scene
    scrollNavBtns[i].classList.add('scroll-story-nav-link-active')
}
const makeNavTooltip = e => {
    let hrefToText = e.target.href.split('#')[1].split('-')
    hrefToText.pop()
    hrefToText = hrefToText.join(' ')
    
    const tooltipWrapper = document.createElement('span')
    const tooltip = document.createElement('span')
    
    tooltipWrapper.classList.add('scroll-story-nav-tooltip-wrapper')
    tooltip.classList.add('scroll-story-nav-tooltip')

    tooltip.textContent = hrefToText

    tooltipWrapper.appendChild(tooltip)
    
    return tooltipWrapper
}
const removeNavTooltip = tooltip => tooltip.remove()
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

    console.log('map instance ', mapInstance)
    console.log('scene info ', mapSceneLayer)

    // apply map scene info from mapSceneLayer
    // zoom, center and filter are straightforward. layer could be complicated..
    
}
const getMapCategory = el => {
    const prev = el.previousElementSibling
    if(prev.classList.contains('map')) return prev
    else return getMapCategory(prev)
}

export default sceneObjs