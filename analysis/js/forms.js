import secondaryMapLayers from './secondaryMapLayers.js'
/*
    lowstressIslands: {
        id: "lowstress-islands",
        type: "line",
        source: "lts",
        "source-layer": "lowstress_islands",
        "paint": {
            "line-width": 0.25,
            "line-color": "#498434"
        }
    }
*/

// LTS filters
const lowStressFilter = ['any',
    ['==', ['get', 'lts_score'], 1],
    ['==', ['get', 'lts_score'], 2]
]

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
const filterLayers = (layer, value) => {
    // process data

    // create filter

    // return filter
}

export { toggleLayers, filterLayers}