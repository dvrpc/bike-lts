import secondaryMapLayers from '../map/secondaryMapLayers.js'
import { clickLayers, makePopup, makePopupContent } from '../map/popup.js'
import { handleLegend, clearAnalysisLegends } from './legends.js'
import { ltsFilters, analysisLookup, selectContentUpdates } from './formsConfigs.js'

const handleForms = (form, map) => {
    const formType = form.dataset.formType

    switch(formType) {
        case 'submit':
            form.onsubmit = e => submitForm(e, form, map)
            break 
        case 'content-replace':
            const select = form.querySelector('.sidebar-select')
            select.onchange = () => handleSelectContentUpdate(select, map)
            break
        default:
            form.onchange = e => toggleForm(e, form, map)
    }
}

const handleSelectContentUpdate = (select, map) => {
    const selected = select.options[select.selectedIndex].value
    const newContent = selectContentUpdates[selected]
    const oldContent = select.nextElementSibling
    const form = select.parentElement
    
    oldContent.remove()
    select.insertAdjacentHTML('afterend', newContent)

    // @TODO: clear existing layers and apply defaults of new select content
    form.onchange = e => toggleForm(e, form, map)
}

const submitForm = (e, form, map) => {
    e.preventDefault()

    const spinner = map['_container'].querySelector('.lds-ring')
    const analysisType = form.querySelector('#analysis-type-select').value
    const analysisLayerSelect = form.querySelector('#analysis-results-select')
    let analysisLayerValue = analysisLayerSelect.value
    const analysisLayer = analysisType ? analysisLayerValue + analysisType : analysisLayerValue.replace('-ipd', '')
    const toggle = analysisLayerSelect.options[analysisLayerSelect.selectedIndex]
    const type = toggle.dataset.layerType

    spinner.classList.add('lds-ring-active')

    toggle.checked = true
    toggle.value = analysisLayer

    // clear analysis layers 
    clearAnalysisLayers(map)

    // determine action based on layer type
    if(type === 'toggle') toggleLayers(toggle, map)
    else filterLayers(form, toggle, map)
}

const toggleForm = (e, form, map) => {
    const spinner = map['_container'].querySelector('.lds-ring')
    const toggle = e.target
    const layerType = toggle.dataset.layerType

    spinner.classList.add('lds-ring-active')

    // determine action based on layer type
    if(layerType === 'toggle') toggleLayers(toggle, map)
    else filterLayers(form, toggle, map)
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
        // @UPDATE: probably don't need handleCoreLayers w/updated layout.
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

const resetAnalysisLayers = map => {
    clearAnalysisLayers(map)
    clearAnalysisLegends()
}

// handle UI changes associated with toggling the core layers
// @UPDATE probably can delete
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

// @TODO clearCoreLayers fnc (obj w/arrays for lts & low-stress toggles. Hide the !selected on change)

export { handleForms, resetAnalysisLayers, handleSelectContentUpdate }