import makeMap from './map/map.js'
import sources from './map/mapSources.js'
import layers from './map/mapLayers.js'
import secondaryMapLayers from './map/secondaryMapLayers.js'
import mapUtils from './map/mapUtils.js'
import handleForms from './sidebar/forms.js'
import handleTabs from './sidebar/tabs.js'
import { tabsLayersToSet } from './sidebar/tabsConfigs.js'
import { makePopup, makePopupContent } from './map/popup.js'
import { toggleLegend } from './sidebar/legends.js'
// import { resetLTSLayers } from './sidebar/formsUtils.js'
// import createFeedbackForm from './sidebar/feedback.js'

const sidebar = document.getElementById('sidebar')
const forms = sidebar.querySelectorAll('.sidebar-form')
const tabs = Array.from(sidebar.querySelector('#sidebar-tabs').children)
const legendBtn = document.getElementById('legendBtn')
// const feedbackBtn = sidebar.querySelector('#feedback-btn')

// map
const map = makeMap()
const ltsLayersPopup = makePopup()

// identify layers to turn off on tab switch
// hardcode connectivity b/c looping thru default layers just to extract existing-conditions and then appending lowstress and facilities doesn't make sense
const tabLayers = {
    'connectivity-tab': ['lowstress-islands', 'facilities', 'existing-conditions'],
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

legendBtn.onclick = e => toggleLegend(e)

// sidebar
// @UPDATE replace legends on tab switch (LTS to Priority connections)
tabs.forEach(tab => {
    tab.onclick = () => {
        // update content
        const tabID = handleTabs(tab, map)
        
        tabLayers[tabID].forEach(layer => {
            if(map.getLayer(layer)) map.setLayoutProperty(layer, 'visibility', 'none')
        })

        // update map
        tabsLayersToSet[tabID].forEach(layer => {
            // truncated version of toggleLayers b/c we know the default layer for connectivity analysis will always JUST be priority
            if(!map.getLayer(layer)){
                const newLayer = secondaryMapLayers[layer]
                map.addLayer(newLayer)

                map.on('click', layer, e => makePopupContent(map, e, ltsLayersPopup))
                map.on('mousemove', layer, () => map.getCanvas().style.cursor = 'pointer')
                map.on('mouseleave', layer, () => map.getCanvas().style.cursor = '')
            }
            
            map.setLayoutProperty(layer, 'visibility', 'visible')
        })

        // reset special filter cases (LTS & low-stress-click)
        if(tabID === 'lts-tab') map.setFilter('existing-conditions', null)
        map.setFilter('lowstress-click', ['==','island_num', 0])
    }
})

// feedback (upcoming)
// feedbackBtn.onclick = () => createFeedbackForm()