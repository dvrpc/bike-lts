import secondaryMapLayers from '../map/secondaryMapLayers.js'
import { clickLayers, makePopup, makePopupContent } from '../map/popup.js'
import { highlightLowStress, highlightLayers } from '../map/highlights.js'
import { handleLegend } from './legends.js'
import { ltsFilters } from './formsConfigs.js'
// @UPDATE keep resetLTSLayers, it's unused because it only exists in contentUpdate as of now
import { resetLTSLayers } from './formsUtils.js'

const handleForms = (form, map) => {
    const formType = form.dataset.formType

    switch(formType) {
        case 'submit':
            form.onsubmit = e => submitForm(e, form, map)
            break
        default:
            form.onchange = e => toggleForm(e, form, map)
    }
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

    // @UPDATE getting legend no longer needed for new legend fnc
    // const legend = toggle.dataset.legendType
    const newLayer = secondaryMapLayers[layer]
    
    if(!map.getLayer(layer)) {
        map.addLayer(newLayer)

        // handle layers that have popups
        if(clickLayers.includes(layer)) {
            const layerPopup = makePopup()

            map.on('click', layer, e => {
                makePopupContent(map, e, layerPopup)
            })
            
            map.on('mousemove', layer, () => map.getCanvas().style.cursor = 'pointer')
            map.on('mouseleave', layer, () => map.getCanvas().style.cursor = '')
        }
        
        // handle layers that have non-popup click events (highlights)
        if(highlightLayers.includes(layer)) {
            map.on('click', layer, e => highlightLowStress(map, e))

            map.on('mousemove', layer, () => map.getCanvas().style.cursor = 'pointer')
            map.on('mouseleave', layer, () => map.getCanvas().style.cursor = '')
        }

    }

    map.setLayoutProperty(layer, 'visibility', visibility)

    // @UPDATE comment out for now until legend overlay is added and hooked into
    // handleLegend(legend, toggle.checked, 1)
}

const filterLayers = (form, toggle, map) => { 
    const layer = toggle.name

    // @UPDATE getting legend no longer needed for new legend fnc
    // const legend = toggle.dataset.legendType

    // get all checked boxes
    const allChecked = form.querySelectorAll('input[type="checkbox"]:checked')
    let baseFilter = allChecked.length ? ['any'] : ['<', 'lts_score', 0]

    // loop checked inputs & append each to filter obj
    allChecked.forEach(input => {
        const layerFilter = ltsFilters[input.value]
        baseFilter = layerFilter ? baseFilter.concat(layerFilter) : baseFilter
    })

    map.setFilter(layer, baseFilter)

    // @UPDATE comment out for now until legend overlay is added and hooked into
    //handleLegend(legend, toggle.checked, 1)
}

export default handleForms