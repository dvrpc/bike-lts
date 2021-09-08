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
    const spinner = mapContainer.querySelector('.lds-ring')
    const analysisLayerSelect = form.querySelector('#analysis-results-select')
    const isIPD = form.querySelector('#analysis-type-select').value

    const legendContainer = mapContainer.firstElementChild
    const selectedAnalysis = analysisLayerSelect.value
    const toggle = analysisLayerSelect.options[analysisLayerSelect.selectedIndex]
    const analysisIgnoreLayer = isIPD ? selectedAnalysis : selectedAnalysis + '-ipd'
    let destination;

    spinner.classList.add('lds-ring-active')

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
    const spinner = map['_container'].querySelector('.lds-ring')
    const toggle = e.target
    const layerType = toggle.dataset.layerType

    spinner.classList.add('lds-ring-active')

    if(layerType === 'toggle') toggleLayers(toggle, map)
    else filterLayers(form, toggle, map)
}

const toggleLayers = (toggle, map) => {
    const layer = toggle.value
    const visibility = toggle.checked ? 'visible' : 'none'

    // @UPDATE new select fnc drops the toggle entirely, 
    const legend = toggle.dataset.legendType
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
    handleLegend(legend, toggle.checked, 1)
}

// 1 prevent default
// 2 flip all four toggles according to btn
// call filterLayers()
const submitLTS = (e, form, map) => {
    e.preventDefault()

    console.log('e ', e.target)

    const btn = e.target.id
    const ltsToggleForm = form.previousElementSibling
    const ltsToggles = ltsToggleForm.querySelectorAll('[data-layer-type="filter"]')
    const toggle ={name: 'existing-conditions'}

    console.log(btn)

    btn === 'clear-lts' ? ltsToggles.forEach(toggle => toggle.checked = false) : ltsToggles.forEach(toggle => toggle.checked = true)

    // filterLayers(ltsToggleForm, toggle, map)
}

const filterLayers = (form, toggle, map) => {
    const allChecked = form.querySelectorAll('[data-layer-type="filter"]:checked')
    const layer = toggle.name
    let baseFilter = []

    allChecked.forEach(input => {
        const layerFilter = ltsFilters[input.value]
        baseFilter = layerFilter ? baseFilter.concat(layerFilter) : baseFilter
    })

    map.setFilter(layer, baseFilter)
}

export default handleForms