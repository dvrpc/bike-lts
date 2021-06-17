import makeMap from './map/map.js'
import sources from './map/mapSources.js'
import layers from './map/mapLayers.js'
import mapUtils from './map/mapUtils.js'
import { makePopup, makePopupContent } from './map/popup.js'
import { handleForms, resetAnalysisLayers, resetLTSLayers } from './sidebar/forms.js'
// import createFeedbackForm from './sidebar/feedback.js'

const sidebar = document.getElementById('sidebar')
const forms = sidebar.querySelectorAll('.sidebar-form')
// const feedbackBtn = sidebar.querySelector('#feedback-btn')
const resetAnalysisBtn = sidebar.querySelector('#clear-analysis-btn')
const resetLTSBtn = sidebar.querySelector('#clear-lts-btn')

// map
const map = makeMap()
const ltsLayersPopup = makePopup()

map.on('load', () => {
    const firstSymbolId = mapUtils.getFirstSymbolId(map)

    for(const source in sources) map.addSource(source, sources[source])
    for(const layer in layers) map.addLayer(layers[layer], firstSymbolId)

    forms.forEach(form => handleForms(form, map))
    resetAnalysisBtn.onclick = () => resetAnalysisLayers(map)
    resetLTSBtn.onclick = e => resetLTSLayers(map, e)

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