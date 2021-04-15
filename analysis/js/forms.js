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
        const layer = toggle.name       
        
        // handle meta toggles (currently all filter layers are part of a meta toggle but build it for the future)
        if(toggle.classList.contains('core-lts')) {
            const coreInputs = form.querySelectorAll('.core-lts')
            const selectedInput = {value: toggle.value, state: toggle.checked}

            handleCoreLayers(coreInputs, selectedInput)
        }

        // get all checked boxes after handling core layers
        const allChecked = form.querySelectorAll('input[type="checkbox"]:checked')
        let baseFilter = allChecked.length ? ['any'] : ['<', 'lts_score', 0]

        // loop checked inputs & append each to filter obj
        allChecked.forEach(input => {
            const layerFilter = ltsFilters[input.value]
            baseFilter = layerFilter ? baseFilter.concat(layerFilter) : baseFilter
        })

        map.setFilter(layer, baseFilter)
}

// handle UI changes associated with toggling the core layers
const handleCoreLayers = (coreInputs, selectedInput) => {
    let existing = selectedInput.value === 'existing-conditions' ? true : false
    let on = selectedInput.state

    coreInputs.forEach(input => {
        if(existing) {
            if(on) input.checked = true
            else input.checked = false
        }

        if(!existing && !on) {
            if(input.value === 'existing-conditions') input.checked = false
        }
    })
}

export default handleForms