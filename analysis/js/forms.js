import secondaryMapLayers from './secondaryMapLayers.js'
import handleLegend from './legends.js'
import { clickLayers, makePopup, makePopupContent } from './popup.js'

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
const analysisLookup = ['priority', 'school', 'trail', 'transit', 'priority-ipd', 'school-ipd', 'trail-ipd', 'transit-ipd']

// @UPDATE: move onchange logic into separate fnc
// check if form type is submit or not
    // form.onsubmit invokes refactored onchange logic for submit forms
    // form.onchange invokes refactored onchange logic for defafult form types
const handleForms = (form, map) => {
    const type = form.dataset.formType
    const spinner = map['_container'].querySelector('.lds-ring')
    spinner.classList.add('lds-ring-active')

    switch(type) {
        case 'submit':
            form.onsubmit = e => {
                e.preventDefault()

                const analysisType = form.querySelector('#analysis-type-select').value
                const analysisLayerSelect = form.querySelector('#analysis-results-select')
                const analysisLayer = analysisLayerSelect.value + analysisType
                const toggle = analysisLayerSelect.options[analysisLayerSelect.selectedIndex]
                const type = toggle.dataset.layerType

                toggle.checked = true
                toggle.value = analysisLayer

                // clear analysis layers 
                clearAnalysisLayers(map)

                // determine action based on layer type
                if(type === 'toggle') toggleLayers(toggle, map)
                else filterLayers(form, toggle, map)
            }
            break 
        default:
            form.onchange = e => {
                const toggle = e.target
                const type = toggle.dataset.layerType
        
                // determine action based on layer type
                if(type === 'toggle') toggleLayers(toggle, map)
                else filterLayers(form, toggle, map)
            }
    }
}

const toggleLayers = (toggle, map) => {
    const layer = toggle.value
    const visibility = toggle.checked ? 'visible' : 'none'
    const legend = toggle.dataset.legendType
    const newLayer = secondaryMapLayers[layer]
    
    if(!map.getLayer(layer)) {
        map.addLayer(newLayer)

        // handle layers that have popups
        if(clickLayers.includes(layer)) {
            const layerPopup = makePopup()
            map.on('click', layer, e => makePopupContent(map, e, layerPopup))
            map.on('mousemove', layer, () => map.getCanvas().style.cursor = 'pointer')
            map.on('mouseleave', layer, () => map.getCanvas().style.cursor = '')
        }
    }

    map.setLayoutProperty(layer, 'visibility', visibility)

    handleLegend(legend, toggle.checked, 1)
}

const filterLayers = (form, toggle, map) => { 
        const layer = toggle.name 
        const legend = toggle.dataset.legendType
        let acca = 1
        
        // handle meta toggles (currently all filter layers are part of a meta toggle but build it for the future)
        if(toggle.classList.contains('core-lts')) {
            const coreInputs = form.querySelectorAll('.core-lts')
            const selectedInput = {value: toggle.value, state: toggle.checked}

            // handle existing conditions legends special case
            acca = handleCoreLayers(coreInputs, selectedInput)
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

        handleLegend(legend, toggle.checked, acca)
}

// handle UI changes associated with toggling the core layers
const handleCoreLayers = (coreInputs, selectedInput) => {
    let existing = selectedInput.value === 'existing-conditions' ? true : false
    let on = selectedInput.state
    let acca = 1

    coreInputs.forEach(input => {
        if(existing) {
            if(on)  input.checked = true
            else input.checked = false
            // handle existing conditions acca math
            acca = 4
        }

        if(!existing && !on) {
            if(input.value === 'existing-conditions') input.checked = false
        }
    })

    return acca
}

const clearAnalysisLayers = map => {
    analysisLookup.forEach(layer => {
        if(map.getLayer(layer)) map.setLayoutProperty(layer, 'visibility', 'none')
    })
}

export default handleForms