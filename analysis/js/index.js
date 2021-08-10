import makeMap from './map/map.js'
import sources from './map/mapSources.js'
import layers from './map/mapLayers.js'
import secondaryMapLayers from './map/secondaryMapLayers.js'
import mapUtils from './map/mapUtils.js'
import handleForms from './sidebar/forms.js'
import handleTabs from './sidebar/tabs.js'
import { tabsLayersToSet } from './sidebar/tabsConfigs.js'
import { geoCallback } from './sidebar/tabsUtils.js'
import { makePopup, makePopupContent } from './map/popup.js'
// import { resetLTSLayers } from './sidebar/formsUtils.js'
// import createFeedbackForm from './sidebar/feedback.js'

const sidebar = document.getElementById('sidebar')
const forms = sidebar.querySelectorAll('.sidebar-form')
const tabs = Array.from(sidebar.querySelector('#sidebar-tabs').children)
// const feedbackBtn = sidebar.querySelector('#feedback-btn')

// map
const map = makeMap()
const ltsLayersPopup = makePopup()

const tabLayers = {
    'connectivity-tab': Object.keys(layers).map(layer => layers[layer].id).filter(layer => geoCallback(layer)),
    'lts-tab': Object.keys(secondaryMapLayers).map(layer => secondaryMapLayers[layer].id)
}

map.on('load', () => {
    const firstSymbolId = mapUtils.getFirstSymbolId(map)

    for(const source in sources) map.addSource(source, sources[source])
    for(const layer in layers) map.addLayer(layers[layer], firstSymbolId)

    forms.forEach(form => handleForms(form, map))

    map.on('click', 'existing-conditions', e => makePopupContent(map, e, ltsLayersPopup))
    map.on('mousemove', 'existing-conditions', () => map.getCanvas().style.cursor = 'pointer')
    map.on('mouseleave', 'existing-conditions', () => map.getCanvas().style.cursor = '')
})

map.on('idle', () => {
    const spinner = map['_container'].querySelector('.lds-ring')
    spinner.classList.remove('lds-ring-active')
})

// sidebar
tabs.forEach(tab => {
    tab.onclick = () => {
        // update content
        const tabID = handleTabs(tab, map)
        
        console.log(tabLayers[tabID])
        tabLayers[tabID].forEach(layer => {
            if(map.getLayer(layer)) map.setLayoutProperty(layer, 'visibility', 'none')
        })

        // apply new map
        // @ISSUE: check toggleLayers fnc for full requirements
            // if layer hasn't already been applied, it neither exists on the map nor has event handlers
            // don't need full jawn b/c default layers will always be the same
                // LTS for LTS analysis
                // priority for connectivity analysis
            // b/c of this, it could make sense to include the default layers for each tab view as part of the 
            // base map
                // for now just priority
            // import toggleLayers and its internal fncs
                // 
        tabsLayersToSet[tabID].forEach(layer => {
            const toggle = {
                value: layer,
                checked: 'visible'
            }

            // toggleLayers(toggle, map)
        })

    }
})

// feedback (upcoming)
// feedbackBtn.onclick = () => createFeedbackForm()