import secondaryMapLayers from '../map/secondaryMapLayers.js'
import { clickLayers, makePopup, makePopupContent } from '../map/popup.js'
import { handleLegend, clearAnalysisLegends } from './legends.js'

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
const analysisLookup = ['priority', 'school', 'trails', 'transit', 'priority-ipd', 'school-ipd', 'trails-ipd', 'transit-ipd']

const selectContentUpdates = {
    ['regional-connectivity']: `
        <fieldset class="sidebar-fieldset">
            <legend>Levels of Traffic Stress (LTS)</legend>

            <label class="sidebar-form-label">
                <input type="checkbox" class="sidebar-form-checkbox core-lts" data-layer-type="filter" data-legend-type="lts" name="existing-conditions" value="lts-1" checked>
                LTS 1
            </label>
            
            <label class="sidebar-form-label">
                <input type="checkbox" class="sidebar-form-checkbox core-lts" data-layer-type="filter" data-legend-type="lts" name="existing-conditions" value="lts-2" checked>
                LTS 2
            </label>

            <label class="sidebar-form-label">
                <input type="checkbox" class="sidebar-form-checkbox core-lts" data-layer-type="filter" data-legend-type="lts" name="existing-conditions" value="lts-3" checked>
                LTS 3
            </label>
            
            <label class="sidebar-form-label lts-layer-4">
                <input type="checkbox" class="sidebar-form-checkbox core-lts" data-layer-type="filter" data-legend-type="lts" name="existing-conditions" value="lts-4" checked>
                LTS 4
            </label>
        </fieldset>
    `,
    ['low-stress']: `
        <fieldset class="sidebar-fieldset">
            <legend>Low-Stress Areas</legend>
                <label class="sidebar-form-label side-form-label-lts">
                    <input type="checkbox" class="sidebar-form-checkbox" data-layer-type="toggle" data-legend-type="lowstress" name="lowstress-islands" value="lowstress-islands" checked>
                    low-stress areas
                </label>

                <label class="sidebar-form-label">
                    <input type="checkbox" class="sidebar-form-checkbox core-lts" data-layer-type="filter" data-legend-type="lts" name="existing-conditions" value="lts-3">
                    LTS 3
                </label>
                
                <label class="sidebar-form-label">
                    <input type="checkbox" class="sidebar-form-checkbox core-lts" data-layer-type="filter" data-legend-type="lts" name="existing-conditions" value="lts-4">
                    LTS 4
                </label>
        </fieldset>
    `
}

const handleForms = (form, map) => {
    const formType = form.dataset.formType

    switch(formType) {
        case 'submit':
            form.onsubmit = e => submitForm(e, form, map)
            break 
        case 'content-replace':
            form.onchange = () => handleSelectContentUpdate(form)
            break
        default:
            form.onchange = e => toggleForm(e, form, map)
    }
}

const handleSelectContentUpdate = form => {
    const select = form.querySelector('.sidebar-select')
    const selected = select.options[select.selectedIndex].value
    const newContent = selectContentUpdates[selected]
    const oldContent = select.nextElementSibling
    
    oldContent.remove()
    select.insertAdjacentHTML('afterend', newContent)
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

export { handleForms, resetAnalysisLayers, handleSelectContentUpdate }