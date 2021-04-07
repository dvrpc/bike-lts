import secondaryMapLayers from './secondaryMapLayers.js'

// LTS filters
// @TODO update lts_score to Int on tiles
const ltsFilters = {
    'existing-conditions': false,
    'lowstress-islands': [
        ['<', 'lts_score', "3"]
    ],
    'lts-1': [
        ['==', 'lts_score', "1"]
    ],
    'lts-2': [
        ['==', 'lts_score', "2"]
    ],
    'lts-3': [
        ['==', 'lts_score', "3"]
    ],
    'lts-4': [
        ['==', 'lts_score', "4"]
    ],
    'priority': [
        ['==', '']
    ]
}

// @TODO 1st line turn spinner overlay on, last line turn it off
// form fields that invoke this function:
    // resource layers
    // analysis layers
        // they are all lts-3 but painted according to the analysis results
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
const filterLayers = (form, map) => {
    // turn spinner on 

    // set map filter 
    form.onchange = e => {
        const input = e.target
        const layer = input.dataset.layer
        const allChecked = form.querySelectorAll('input[type="checkbox"]:checked')
        let baseFilter = allChecked.length ? ['any'] : ['<', 'lts_score', "0"]

        // handle special toggle case
        if(input.classList.contains('core-lts')) handleCoreLayers()

        // loop checked inputs & append each to filter obj
        allChecked.forEach(input => {
            const layerFilter = ltsFilters[input.id]
            baseFilter = layerFilter ? baseFilter.concat(layerFilter) : baseFilter
        })

        console.log(baseFilter)
        map.setFilter(layer, baseFilter)
    }

    // turn spinner off
}

// this funciton just handles the UI changes associated with toggling the core layers
const handleCoreLayers = layer => {
    // each core layer has the possibility of toggling the other.
    // ex. toggling existing-conditions toggles all lts-* layers to its state
    // toggling low-stress-islands toggles lts-1 and lts-2 to its state while turning lts->2 off
    // toggle input el class to reflect layers
}

export { toggleLayers, filterLayers }