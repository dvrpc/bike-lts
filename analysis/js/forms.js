import secondaryMapLayers from './secondaryMapLayers.js'

// LTS filters
const lowStressFilter = ['any',
    ['==', ['get', 'lts_score'], 1],
    ['==', ['get', 'lts_score'], 2]
]

// @TODO 1st line turn spinner overlay on, last line turn it off
// form fields that invoke this function:
    // resource layers
const toggleLayers = (form, map) => {
    form.onchange = e => {
        const layer = e.target.value
        const visibility = e.target.checked ? 'visible' : 'none'

        if(!map.getLayer(layer)) map.addLayer(secondaryMapLayers[layer])

        map.setLayoutProperty(layer, 'visibility', visibility)
    }
}

// @TODO 1st line turn spinner overlay on, last line turn it off
// form fields that invoke this function:
    // LTS layers
    // analysis layers
const filterLayers = (layer, value) => {
    // process data

    // create filter

    // return filter
}

export { toggleLayers, filterLayers }