import makeMap from './map.js'
import sources from './mapSources.js'
import layers from './mapLayers.js'
import handleModal from './modal.js'
import { toggleLayers } from './forms.js'

const modal = document.getElementById('modal')
const modalToggle = document.getElementById('modal-toggle')
const closeModal = document.getElementById('close-modal')
const forms = Array.from(document.querySelectorAll('.sidebar-form-toggle'))


// map
const map = makeMap()

map.on('load', () => {
    for(const source in sources) map.addSource(source, sources[source])
    for(const layer in layers) map.addLayer(layers[layer])

    forms.forEach(form => toggleLayers(form, map))
})


// modal
handleModal(modal, modalToggle, closeModal)
