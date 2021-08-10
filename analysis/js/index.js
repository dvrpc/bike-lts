import makeMap from './map/map.js'
import sources from './map/mapSources.js'
import layers from './map/mapLayers.js'
import mapUtils from './map/mapUtils.js'
import handleForms from './sidebar/forms.js'
import handleTabs from './sidebar/tabs.js'
import { tabsLayersToSet } from './sidebar/tabsConfigs.js'
import { makePopup, makePopupContent } from './map/popup.js'
// import { resetLTSLayers, resetAnalysisLayers } from './sidebar/formsUtils.js'
// import createFeedbackForm from './sidebar/feedback.js'

const sidebar = document.getElementById('sidebar')
const forms = sidebar.querySelectorAll('.sidebar-form')
const tabs = Array.from(sidebar.querySelector('#sidebar-tabs').children)
// const feedbackBtn = sidebar.querySelector('#feedback-btn')

// const resetAnalysisBtn = sidebar.querySelector('#clear-analysis-btn')

// map
const map = makeMap()
const ltsLayersPopup = makePopup()

map.on('load', () => {
    const firstSymbolId = mapUtils.getFirstSymbolId(map)

    for(const source in sources) map.addSource(source, sources[source])
    for(const layer in layers) map.addLayer(layers[layer], firstSymbolId)

    forms.forEach(form => handleForms(form, map))
    // resetAnalysisBtn.onclick = () => resetAnalysisLayers(map)

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

        // clear map
            // option 1: 
                // use tab-clear keys in tabsContent obj to iterate over all possible layers
                // in a given tab and setLayoutProperty to invisible

            // option 2:
                // iterate over secondaryMapLayers object and clear all layers in it
                // doesn't account for LTS layer but that can be handled separately
                // advantage here is no need to maintain 2 arrays for clear. Any additional secondary layers
                // will automatically be cleared when they're added
                
                
        // @TODO pass tabID into map update fncs
        // map.setLayoutProperty(layer, 'visibility', 'none')

        // apply new map
        // @ISSUE: check toggleLayers fnc for full requirements
            // if layer hasn't already been applied, it neither exists on the map nor has event handlers
            // don't need full jawn b/c default layers will always be the same
                // LTS for LTS analysis
                // priority for connectivity analysis
            // b/c of this, it could make sense to include the default layers for each tab view as part of the 
            // base map
        tabsLayersToSet[tabID].forEach(layer => {
            // add layer if it doesn't already exist
            map.setLayoutProperty(layer, 'visibility', 'visible')
        })

    }
})

// feedback (upcoming)
// feedbackBtn.onclick = () => createFeedbackForm()