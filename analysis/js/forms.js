import secondaryMapLayers from './secondaryMapLayers.js'

// LTS filters
const ltsFilters = {
    'existing-conditions': false,
    'lowstress-islands': false,
    'lts-1': [
        ['==', 'lts_score', 1]
    ],
    'lts-2': [
        ['==', 'lts_score', 2]
    ],
    'lts-3': [
        ['==', 'lts_score', 3]
    ],
    'lts-4': [
        ['==', 'lts_score', 4]
    ]
}

// form fields that invoke this function:
    // resource layers
    // analysis layers
        // they are all lts-3 but painted according to the analysis results
const toggleLayers = (form, map) => {
    form.onchange = e => {
        const spinner = map['_container'].querySelector('.lds-ring')
        const layer = e.target.value
        const visibility = e.target.checked ? 'visible' : 'none'

        // turn spinner on
        spinner.classList.add('lds-ring-active')

        if(!map.getLayer(layer)) map.addLayer(secondaryMapLayers[layer])

        map.setLayoutProperty(layer, 'visibility', visibility)
    }
}

// form fields that invoke this function:
    // LTS layers
    // analysis layers
const filterLayers = (form, map) => {
    form.onchange = e => {
        const spinner = map['_container'].querySelector('.lds-ring')
        const input = e.target
        const layer = input.dataset.layer
        
        // turn spinner on
        spinner.classList.add('lds-ring-active')

        // handle special toggle case
        if(input.classList.contains('core-lts')) {
            const coreInputs = form.querySelectorAll('.core-lts')
            const selectedState = {id: input.id, state: input.checked}

            handleCoreLayers(coreInputs, selectedState)
        }

        // get all checked boxes after handling core layers
        const allChecked = form.querySelectorAll('input[type="checkbox"]:checked')
        let baseFilter = allChecked.length ? ['any'] : ['<', 'lts_score', 0]

        // loop checked inputs & append each to filter obj
        allChecked.forEach(input => {
            const layerFilter = ltsFilters[input.id]
            baseFilter = layerFilter ? baseFilter.concat(layerFilter) : baseFilter
        })

        map.setFilter(layer, baseFilter)
    }
}

// handle UI changes associated with toggling the core layers
// @NEW: Low Stress islands toggle is independent on LTS 1 and 2 
    // it is 1 and 2 but with islands grouped by color
        // create it as a separate layer b/c it needs data driven styles
    // remove it from the core layers fnc - the only interaction we need here is the existing conditions jawn
    // IF LTS 1 or 2 are turned on while islands are on, kill islands. something like that.
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