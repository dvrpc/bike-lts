import secondaryMapLayers from '../map/secondaryMapLayers.js'
import { clickLayers, makePopup, makePopupContent } from '../map/popup.js'
import { highlightLowStress, highlightLayers } from '../map/highlights.js'
import { handleLegend, removeLegend } from './legends.js'
import { ltsFilters, specialDestinationLayers } from './formsConfigs.js'

const handleForms = (form, map) => {
    const formType = form.dataset.formType

    switch(formType) {
        case 'toggle-select':
            form.onchange = e => toggleSelectForm(e, form, map)
            break
        case 'submit':
            form.onsubmit = e => submitLTS(e, form, map)
            break
        default:
            form.onchange = e => toggleForm(e, form, map)
    }
}

const toggleSelectForm = (e, form, map) => {
    e.preventDefault()
    
    const mapContainer = map['_container']
    mapContainer.querySelector('.lds-ring').classList.add('lds-ring-active')
    const analysisLayerSelect = form.querySelector('#analysis-results-select')
    const isIPD = form.querySelector('#analysis-type-select').value

    const legendContainer = mapContainer.firstElementChild
    const selectedAnalysis = analysisLayerSelect.value
    const toggle = analysisLayerSelect.options[analysisLayerSelect.selectedIndex]
    const analysisIgnoreLayer = isIPD ? selectedAnalysis : selectedAnalysis + '-ipd'
    let destination;

    for(destination in specialDestinationLayers) {
        const destinationArray = specialDestinationLayers[destination]

        // toggle on special + associated reference layers
        if(destination === selectedAnalysis) {
            destinationArray.forEach(layer => {
                
                // handle destination lyaers, references and their associated legends + ignore inactive destination layer
                switch(layer) {
                    case analysisIgnoreLayer:
                        if(map.getLayer(layer)) map.setLayoutProperty(layer, 'visibility', 'none')
                        break
                    case selectedAnalysis:
                        toggle.checked = true
                        toggle.value = layer
                        toggleLayers(toggle, map)
                        break
                    default:
                        const referenceToggle = {
                            checked: true,
                            value: layer,
                            dataset: {
                                legendType: layer,
                                legendReps: ''
                            }
                        }
                        toggleLayers(referenceToggle, map)
                }
            })

        // hide all others & purge legends
        } else {
            destinationArray.forEach(layer => {
                if(map.getLayer(layer)) map.setLayoutProperty(layer, 'visibility', 'none')
            })

            removeLegend(destinationArray, legendContainer)
        }
    }
}

const toggleForm = (e, form, map) => {
    map['_container'].querySelector('.lds-ring').classList.add('lds-ring-active')

    const toggle = e.target
    const layerType = toggle.dataset.layerType

    if(layerType === 'toggle') toggleLayers(toggle, map)
    else filterLayers(form, toggle, map)
}

const toggleLayers = (toggle, map) => {
    const layer = toggle.value
    const visibility = toggle.checked ? 'visible' : 'none'

    const legend = toggle.dataset.legendType
    const newLayer = secondaryMapLayers[layer]
    
    if(!map.getLayer(layer)) {
        map.addLayer(newLayer, 'road-label')

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

    // handle low-stress click
    if (layer === 'lowstress-islands' && !toggle.checked) map.setFilter('lowstress-click', ['==', 'island_num', 0])

    map.setLayoutProperty(layer, 'visibility', visibility)

    handleLegend(legend, toggle.checked, 1)
}

const submitLTS = (e, form, map) => {
    e.preventDefault()
    map['_container'].querySelector('.lds-ring').classList.add('lds-ring-active')

    const btn = e.target.submitted
    const ltsToggleForm = form.previousElementSibling
    const ltsToggles = ltsToggleForm.querySelectorAll('[data-layer-type="filter"]')
    const toggle ={name: 'existing-conditions'}

    btn === 'clear-lts' ? ltsToggles.forEach(toggle => toggle.checked = false) : ltsToggles.forEach(toggle => toggle.checked = true)

    filterLayers(ltsToggleForm, toggle, map)
}

const filterLayers = (form, toggle, map) => {
    const allChecked = form.querySelectorAll('[data-layer-type="filter"]:checked')
    const mapContainer = map['_container']
    const legendContainer = mapContainer.firstElementChild
    const layer = toggle.name
    let baseFilter;

    switch(allChecked.length) {
        case 4:                
            baseFilter = null
            handleLegend('lts', true, 1)
            break
        case 0:                
            baseFilter = ['<', 'lts_score', 0]
            removeLegend(['lts'], legendContainer)
            break
        default:
            baseFilter = ['any']
            handleLegend('lts', true, 1)

            allChecked.forEach(input => {
                const layerFilter = ltsFilters[input.value]
                baseFilter = layerFilter ? baseFilter.concat(layerFilter) : baseFilter
            })  
    }

    map.setFilter(layer, baseFilter)
}

export default handleForms