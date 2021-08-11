import { handleLegend } from "./legends.js"

const resetLTSLayers = (map, e) => {
    const btn = e.target
    const parent = btn.parentElement
    const labels = parent.querySelectorAll('label')

    // update toggles
    labels.forEach(label => {
        const input = label.firstElementChild
        input.checked = false
    })
    
    // set filter and remove legend
    map.setFilter('existing-conditions', ['<', 'lts_score', 0])
    handleLegend('lts', false, 4)
}

// @TODO make default export
export { resetLTSLayers }