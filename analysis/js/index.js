import makeMap from './map/map.js'
import sources from './map/mapSources.js'
import layers from './map/mapLayers.js'
import secondaryMapLayers from './map/secondaryMapLayers.js'
import mapUtils from './map/mapUtils.js'
import handleForms from './sidebar/forms.js'
import handleTabs from './sidebar/tabs.js'
import { tabsLayersToSet } from './sidebar/tabsConfigs.js'
import { makePopup, makePopupContent } from './map/popup.js'
import { toggleLegend, clearLegend, handleLegend } from './sidebar/legends.js'
// import createFeedbackForm from './sidebar/feedback.js'

const sidebar = document.getElementById('sidebar')
const forms = sidebar.querySelectorAll('.sidebar-form')
const tabs = Array.from(sidebar.querySelector('#sidebar-tabs').children)
const legendBtn = document.getElementById('legendBtn')
const legendContainer = legendBtn.nextElementSibling
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
    // @improvement: get basemap ID to set text-allow-overlap and force labels above all layers by defafult
    // map.setLayoutProperty('dark-v10', 'text-allow-overlap', true)

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
tabs.forEach(tab => {
    tab.onclick = () => {
        map['_container'].querySelector('.lds-ring').classList.add('lds-ring-active')

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
                map.addLayer(newLayer, 'road-label')

                map.on('click', layer, e => makePopupContent(map, e, ltsLayersPopup))
                map.on('mousemove', layer, () => map.getCanvas().style.cursor = 'pointer')
                map.on('mouseleave', layer, () => map.getCanvas().style.cursor = '')
            }
            
            map.setLayoutProperty(layer, 'visibility', 'visible')
        })

        // reset special filter cases (LTS & low-stress-click)
        map.setFilter('existing-conditions', null)
        map.setFilter('lowstress-click', ['==','island_num', 0])

        // handle popups
        const popup = map['_container'].querySelector('.mapboxgl-popup')
        if(popup) popup.remove()

        // update legends 
        // @TODO update arrow state (down closed, up open)
        clearLegend(legendContainer)
        tabID === 'lts-tab' ? handleLegend('lts', true, 4) : handleLegend('priority', true, 1)
    }
})

// feedback (upcoming)
// feedbackBtn.onclick = () => createFeedbackForm()