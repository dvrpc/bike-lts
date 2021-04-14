import secondaryMapLayers from './secondaryMapLayers.js'

// LTS filters
const ltsFilters = {
    'existing-conditions': false,
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

// @NEW form handlers
/*
    DELETE sidebar-form-toggle and sidebar-form-filter classes. 
    KEEP sidebar-form
    give each layer data-layer-type with value "toggle" or "filter"
    Create larger fnc handleForms
        create filter array
        loop thru all checked toggles on change
        check data-layer-type
            invoke toggleLayers() for each "toggle" type
            concat filter for each "filter" type
            after the loop, invoke filterLayers() with the filter as a param
                include logic for empty filter i.e. if(filter.length) ['<', 'lts_score', 0] + setFilter ELSE logic
        spinner logic stays the same
*/
const handleForms = (form, map) => {
    form.onchange = e => {
        const spinner = map['_container'].querySelector('.lds-ring')
        const toggle = e.target
        const type = toggle.dataset.layerType

        // turn spinner on
        spinner.classList.add('lds-ring-active')

        // determine action based on layer type
        if(type === 'toggle') toggleLayers(toggle, map)
        else filterLayers(form, toggle, map)
    }
}

const toggleLayers = (toggle, map) => {
    const layer = toggle.value
    const visibility = toggle.checked ? 'visible' : 'none'

    if(!map.getLayer(layer)) map.addLayer(secondaryMapLayers[layer])

    map.setLayoutProperty(layer, 'visibility', visibility)
}

const filterLayers = (form, toggle, map) => {        
        // handle special toggle case (currently this is all filters but build it for the future)
        if(toggle.classList.contains('core-lts')) {
            const coreInputs = form.querySelectorAll('.core-lts')
            const selectedState = {id: toggle.id, state: toggle.checked}

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
    let on = selectedInput.state

    // check if existing or low stress is checked
    coreInputs.forEach(input => {
        if(existing) {
            if(on) input.id === 'lowstress-islands' ? input.checked = false : input.checked = true
            else input.checked = false
        }

        if(!existing && !on) {
            if(input.id === 'existing-conditions') input.checked = false
        }
    })
}

export default handleForms