import { sceneLayers } from './mapLayers.js'

// get scene sections
const scenes = document.querySelectorAll('.scene-section')
const l = scenes.length
const sceneObjs = []

// get nav els minus hr
const scrollNav = document.getElementById('scroll-story-nav-ul').children
const scrollNavBtns = Array.from(scrollNav).filter(el => el.nodeName != 'HR')

// get maps @NOTE this will be hte output of array.map on the 3 map instances.
// move that from index.js into here. Will eventually help w/lazy loading too
const maps = {
    stress: {},
    connectivity: {},
    special: {}
}


// create scene objects
for(let i = 0; i < l; i++) {
    sceneObjs.push( new ScrollMagic.Scene({
        duration: 200,
        triggerElement: scenes[i],
        reverse: true
    })
    .on('enter', e => {
        toggleAnimation(e, scenes[i])
        toggleNavLink(i)
        toggleMapView(e)
        // update for map jawn:
        // data-map ? toggleMapView(data-map-category, data-map-id) : null
        // aka check for presence of map data attribute and invoke toggleMapView with it, or do nothing
        // @TODO efficient way to automate getting the map instance
            // one option is to check first for data-map-id
                // if it exists, use a recursive helper that invokes previousElementSibling until previousElementSibling.classList.contain('map') and then return that element
                // extract the data-map-category from the returned element
                // invoke toggleMapView() w/data-map-category and data-map-id
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

// @TODO escape no-map cases
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

    // apply map scene info from mapSceneLayer
    // zoom, center and filter are straightforward. layer could be complicated..
    
}

export default sceneObjs