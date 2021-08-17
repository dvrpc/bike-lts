import legends from './legendConfigs.js'

const handleLegend = (legend, checked, acca) => {
    // get legend container (obviously not this way)
    const container = document.getElementById('legend-content')
    const children = container.children
    let hasLegend = false
    let legendReps = 0
    const checkIPD = legend.split('-')
    legend = checkIPD[1] === 'ipd' ? checkIPD[0] : legend

    // if legend already exists, get it
    for(var i = 0; i < children.length; i++) {
        const legendType = children[i].dataset.filterType

        // acca the rest
        if(legendType === legend) {
            hasLegend = children[i]
            legendReps = parseInt(hasLegend.dataset.legendReps)
        }
    }

    if(checked) {
        if(hasLegend) {
            // hack to handle existing conditions edge cases
            const increment = legendReps + acca > 4 ? 4 : legendReps + acca
            hasLegend.dataset.legendReps = increment
        
        } else {
            const newLegend = makeLegend(legend, acca)
            container.insertAdjacentHTML('beforeend', newLegend)
        }

        return
    }

    const decrement = legendReps - acca

    if(decrement < 1) container.removeChild(hasLegend)
    else hasLegend.dataset.legendReps = decrement
}

const makeLegend = (type, acca) => {
    const legend = legends[type]
    const text = legend.text
 
    return `
        <article class="legend-section" data-filter-type=${type} data-legend-reps=${acca}>
            <h3 class="legend-subheader">${legend.title}</h3>
            
            <div class="legend-content-container flex-row flex-around">
                ${legend.icons.map((icon, i) => `
                    <div class="flex-column flex-align-center">
                        <span class="legend-icon-${legend.iconType}" style="background-color:${icon}"></span>
                        <span class="legend-text">${text[i]}</span>
                    </div>
                `).join(' ')}
            </div>
        </article>
    `
}

const toggleLegend = e => {
    const content = e.target.nextElementSibling
    content.classList.toggle('legend-content-hide')
}

// remove specific legends
const removeLegend = (destinationArray, container) => {
    const legendGroup = container.lastElementChild

    destinationArray.forEach(layer => {
        const toRemove = legendGroup.querySelector(`[data-filter-type="${layer}"]`)
        if(toRemove) legendGroup.removeChild(toRemove)
    })
}

// wholesale clear of legend
const clearLegend = container => {
    while(container.firstChild) container.removeChild(container.firstChild)
}

export { handleLegend, toggleLegend, removeLegend, clearLegend }