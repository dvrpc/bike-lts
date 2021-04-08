import secondaryMapLayers from './secondaryMapLayers.js'

// LTS filters
// @TODO update lts_score to Int on tiles
const ltsFilters = {
    'existing-conditions': false,
    'lowstress-islands': false,
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

        // handle special toggle case
        if(input.classList.contains('core-lts')) {
            const coreInputs = form.querySelectorAll('.core-lts')
            const selectedState = {id: input.id, state: input.checked}

            handleCoreLayers(coreInputs, selectedState)
        }

        // get all checked boxes after handling core layers
        const allChecked = form.querySelectorAll('input[type="checkbox"]:checked')
        let baseFilter = allChecked.length ? ['any'] : ['<', 'lts_score', "0"]

        // loop checked inputs & append each to filter obj
        allChecked.forEach(input => {
            const layerFilter = ltsFilters[input.id]
            baseFilter = layerFilter ? baseFilter.concat(layerFilter) : baseFilter
        })

        map.setFilter(layer, baseFilter)
    }

    // turn spinner off
}

// this funciton just handles the UI changes associated with toggling the core layers
const handleCoreLayers = (coreInputs, selectedInput) => {
    // get coreInputs inputs
    // need to know the selected input and it's state (i.e. turning existing on or off)
    let existing = selectedInput.id === 'existing-conditions' ? true : false
    let lowStress = selectedInput.id === 'lowstress-islands' ? true : false
    let on = selectedInput.state

    // cases
        // IF selected === existing, turn off low stress and turn on all 4 cores
        // IF selected === low-stress, turn off existing and turn on lts 1 and 2
        // Edge case for toggling individual lts-layers that may trigger 
            // ex lts 1-3 are selected and user selectes lts-4. Will need to turn existing toggle on 

    // check if existing or low stress is checked
    coreInputs.forEach(input => {
        if(existing) {
            if(on) input.id === 'lowstress-islands' ? input.checked = false : input.checked = true
            else input.checked = false
        }

        if(lowStress) {
            if(on) input.id === 'existing-conditions' || input.id === 'lts-3' || input.id === 'lts-4' ? input.checked = false : input.checked = true
            else if(input.id === 'lts-1' || input.id === 'lts-2') input.checked = false
        }

        if(!existing && !on) {
            if(input.id === 'existing-conditions') input.checked = false
        }
    })
}

export { toggleLayers, filterLayers }