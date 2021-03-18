import secondaryMapLayers from './secondaryMapLayers.js'

// general purpose form handler
const processForm = form => {

}

// return layer to be toggled
// @TODO 1st line turn spinner overlay on, last line turn it off
const toggleLayers = (form, map) => {
    form.onchange = e => {

        const layer = e.target.value
        const visibility = e.target.checked ? 'visible' : 'none'

        if(!map.getLayer(layer)) map.addLayer(secondaryMapLayers[layer])

        map.setLayoutProperty(layer, 'visibility', visibility)
    }
}

// return filter to be applied
const filterLayers = values => {
    // process data

    // create filter

    // return filter
}

export { toggleLayers, filterLayers}