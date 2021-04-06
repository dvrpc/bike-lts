import secondaryMapLayers from './secondaryMapLayers.js'

// LTS filters
const ltsFilters = {
    'lowstress-islands': [
        ['==', ['get', 'lts_score'], 1],
        ['==', ['get', 'lts_score'], 2]
    ],
    'existing-conditions': []
}

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
const filterLayers = (form, map) => {
    form.onchange = e => {
        // process data
        const input = e.target
        let baseFilter = ['any']
        const layer = input.dataset.layer

        // handle inactive toggling of core UI inputs
        if(input.classList.contains('core-lts')) handleCoreLayers(input, map)
    
        // create filter
        const layerFilter = ltsFilters[input.id]
        baseFilter = baseFilter.concat(layerFilter)
        
        console.log('filter ', baseFilter)
        console.log('layer is ', layer)
        
        // set filter
        map.setFilter(layer, baseFilter)
    }
}

// this funciton just handles the UI changes associated with toggling the core layers
const handleCoreLayers = layer => {
    // each core layer has the possibility of toggling the other.
    // ex. toggling existing-conditions toggles all lts-* layers to its state
    // toggling low-stress-islands toggles lts-1 and lts-2 to its state while turning lts->2 off
    // toggle input el class to reflect layers
}

export { toggleLayers, filterLayers }