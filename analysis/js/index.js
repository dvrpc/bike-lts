import makeMap from './map.js'
import sources from './mapSources.js'
import layers from './mapLayers.js'
import handleForms from './forms.js'
import createFeedbackForm from './feedback.js'
import { makePopup, makePopupContent } from './popup.js'

const sidebar = document.getElementById('sidebar')
const forms = sidebar.querySelectorAll('.sidebar-form')
const feedbackBtn = sidebar.querySelector('#feedback-btn')

// map
const map = makeMap()
const ltsLayersPopup = makePopup()

const getFirstSymbolId = map => {
    const layers = map.getStyle().layers;

    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') return layers[i].id;
    }
}

map.on('load', () => {
    const firstSymbolId = getFirstSymbolId(map)

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

// feedback
feedbackBtn.onclick = () => createFeedbackForm()