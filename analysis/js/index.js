import makeMap from './map.js'
import sources from './mapSources.js'
import layers from './mapLayers.js'
import { toggleLayers, filterLayers } from './forms.js'
import createFeedbackForm from './feedback.js'

const sidebar = document.getElementById('sidebar')
const toggleForms = sidebar.querySelectorAll('.sidebar-form-toggle')
const filterForms = sidebar.querySelectorAll('.sidebar-form-filter')
const feedbackBtn = sidebar.querySelector('#feedback-btn')

// map
const map = makeMap()

map.on('load', () => {
    for(const source in sources) map.addSource(source, sources[source])
    for(const layer in layers) map.addLayer(layers[layer])

    toggleForms.forEach(form => toggleLayers(form, map))
    filterForms.forEach(form => filterLayers(form, map))
})

map.on('idle', () => {
    const spinner = map['_container'].querySelector('.lds-ring')
    spinner.classList.remove('lds-ring-active')
})

// feedback
feedbackBtn.onclick = () => createFeedbackForm()