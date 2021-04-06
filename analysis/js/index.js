import makeMap from './map.js'
import sources from './mapSources.js'
import layers from './mapLayers.js'
import { toggleLayers, filterLayers } from './forms.js'
import createFeedbackForm from './feedback.js'

const toggleForms = Array.from(document.querySelectorAll('.sidebar-form-toggle'))
const filterForms = Array.from(document.querySelectorAll('.sidebar-form-filter'))
const feedbackBtn = document.getElementById('feedback-btn')

// map
const map = makeMap()

map.on('load', () => {
    for(const source in sources) map.addSource(source, sources[source])
    for(const layer in layers) map.addLayer(layers[layer])

    toggleForms.forEach(form => toggleLayers(form, map))
    filterForms.forEach(form => filterLayers(form, map))
})

// feedback
feedbackBtn.onclick = () => createFeedbackForm()