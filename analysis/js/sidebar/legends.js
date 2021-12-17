import legends from './legendConfigs.js'

const handleLegend = (legend, checked, acca) => {
    const container = document.getElementById('legend-content')
    const children = container.children
    let hasLegend = false
    let legendReps = 0
    const checkIPD = legend.split('-')
    let isIPD = false
    
    // track ipd state
    if(checkIPD[1] === 'ipd') {
        isIPD = true
        legend = checkIPD[0]
    }
    
    // if legend already exists, get it
    for(var i = 0; i < children.length; i++) {
        const legendType = children[i].dataset.filterType

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

            // hack to add equity focused to certain subheaders
            if(legend === 'priority' || legend === 'schools' || legend === 'trails' || legend === 'transit') {
                const subheader = hasLegend.querySelector('.legend-subheader')
                const subheaderText = subheader.textContent

                if(isIPD) {
                    subheader.textContent = 'Equity-focused ' + subheaderText
                } else {
                    if(subheaderText.includes('Equity-focused ')) {
                        const newSubheaderText = subheaderText.substring(14)
                        subheader.textContent = newSubheaderText
                    }
                }
            }
        
        } else {
            const newLegend = makeLegend(legend, acca, isIPD)
            container.insertAdjacentHTML('beforeend', newLegend)
        }

        return
    }

    const decrement = legendReps - acca

    if(decrement < 1) container.removeChild(hasLegend)
    else hasLegend.dataset.legendReps = decrement
}

const makeLegend = (type, acca, isIPD) => {
    const legend = legends[type]
    const text = legend.text
    const source = legend.source ?  `<h4 class="legend-source">source: ${legend.source}</h4>` : ''
    const ipdTitle = isIPD ? 'Equity-focused ' : ''
 
    return `
        <article class="legend-section" data-filter-type=${type} data-legend-reps=${acca}>
            <h3 class="legend-subheader">${ipdTitle} ${legend.title}</h3>
            ${source}
            
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
    const legend = e.target
    const content = legend.nextElementSibling
    content.classList.toggle('legend-content-hide')
    // toggle arrow state
    legend.classList.toggle('dropdown-toggle-close')
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