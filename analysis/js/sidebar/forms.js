import secondaryMapLayers from '../map/secondaryMapLayers.js'
import { clickLayers, makePopup, makePopupContent } from '../map/popup.js'
import { highlightLowStress, highlightLayers } from '../map/highlights.js'
import { handleLegend, clearAnalysisLegends } from './legends.js'
import { ltsFilters, analysisLookup, selectContentUpdates } from './formsConfigs.js'

const handleForms = (form, map) => {
    const formType = form.dataset.formType

    switch(formType) {
        case 'submit':
            form.onsubmit = e => submitForm(e, form, map)
            break 
        case 'content-replace':            
            form.onchange = e => {
                const target = e.target

                if(target.nodeName !== 'SELECT') toggleForm(e, form, map)
                else handleSelectContentUpdate(target, map)
            }
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
    
    // clears old layers and sets new ones
    switch(selected) {
        // remove all lts layers & set low-stress to visible
        case 'low-stress':
            const toggle = form.querySelector('input[name="lowstress-islands"]')

            map.setFilter('existing-conditions', ['<', 'lts_score', 0])
            
            toggleLayers(toggle, map)
            handleLegend('lts', false, 4)
            
            break
        
        // remove low-stress and set LTS to visislbe
        default:
            map.setFilter('existing-conditions', null)
            map.setFilter('lowstress-click', ['==', 'island_num', 0])

            map.setLayoutProperty('lowstress-islands', 'visibility', 'none')
            
            handleLegend('lowstress', false, 1)
            handleLegend('lts', true, 4)
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

            map.on('click', layer, e => {
                makePopupContent(map, e, layerPopup)
                if(highlightLayers.includes(layer)) highlightLowStress(map, e)
            })
            
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

        // get all checked boxes after handling core layers
        const allChecked = form.querySelectorAll('input[type="checkbox"]:checked')
        let baseFilter = allChecked.length ? ['any'] : ['<', 'lts_score', 0]

        // loop checked inputs & append each to filter obj
        allChecked.forEach(input => {
            const layerFilter = ltsFilters[input.value]
            baseFilter = layerFilter ? baseFilter.concat(layerFilter) : baseFilter
        })

        map.setFilter(layer, baseFilter)

        handleLegend(legend, toggle.checked, 1)
}

const resetAnalysisLayers = map => {
    clearAnalysisLayers(map)
    clearAnalysisLegends()
}

const clearAnalysisLayers = map => {
    analysisLookup.forEach(layer => {
        if(map.getLayer(layer)) map.setLayoutProperty(layer, 'visibility', 'none')
    })
}

export { handleForms, resetAnalysisLayers }