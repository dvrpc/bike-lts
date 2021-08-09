import makeMap from './map/map.js'
import sources from './map/mapSources.js'
import layers from './map/mapLayers.js'
import mapUtils from './map/mapUtils.js'
import handleForms from './sidebar/forms.js'
import tabsContent from './sidebar/tabsConfigs.js'
import { makePopup, makePopupContent } from './map/popup.js'
// import { resetLTSLayers, resetAnalysisLayers } from './sidebar/formsUtils.js'
// import createFeedbackForm from './sidebar/feedback.js'

const sidebar = document.getElementById('sidebar')
const forms = sidebar.querySelectorAll('.sidebar-form')
const tabs = Array.from(sidebar.querySelector('#sidebar-tabs').children)
const togglesContainer = sidebar.querySelector('#toggles-container')
// const feedbackBtn = sidebar.querySelector('#feedback-btn')

// const resetAnalysisBtn = sidebar.querySelector('#clear-analysis-btn')

// sidebar
tabs.forEach(tab => {
    tab.onclick = e => {
        if(tab.classList.contains('sidebar-tab-active')) return false
        const tabID = tab.id

        const currentActive = tab.previousElementSibling || tab.nextElementSibling

        currentActive.classList.remove('sidebar-tab-active')
        currentActive.classList.add('sidebar-tab-inactive')
        
        tab.classList.remove('sidebar-tab-inactive')
        tab.classList.add('sidebar-tab-active')

        // use tabID to update togglesContainer content
        while(togglesContainer.firstChild) togglesContainer.removeChild(togglesContainer.firstChild)
        togglesContainer.insertAdjacentHTML('afterbegin', tabsContent[tabID])

        // use tabID to update map layers
    }
})

// map
const map = makeMap()
const ltsLayersPopup = makePopup()

map.on('load', () => {
    const firstSymbolId = mapUtils.getFirstSymbolId(map)

    for(const source in sources) map.addSource(source, sources[source])
    for(const layer in layers) map.addLayer(layers[layer], firstSymbolId)

    // @UPDATES form context is loss on tabs replace.
        // either hook into existing form to preserve handler or re-assign
        // handleForms when the tab switches
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

// feedback (upcoming)
// feedbackBtn.onclick = () => createFeedbackForm()