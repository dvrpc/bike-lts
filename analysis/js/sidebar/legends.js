import legends from './legendConfigs.js'

// @UPDATE: change handleLegend to replacing content within map overlay
    // legend sets instead of individuals
        // legends for LTS view & legends for Connectivity view
        // show all for each view
    // no longer need to track state for adding/removing legends (acca and checked state irrelevant)
    // legend param update to ID - which section is active and iterate over makeLegend to create appropriate legnds
const handleLegend = (legend, checked, acca) => {
    // get legend container (obviously not this way)
    const container = document.getElementById('sidebar-legends-container')
    const children = container.children
    let hasLegend = false
    let legendReps = 0

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
        <article class="sidebar-legend-section" data-filter-type=${type} data-legend-reps=${acca}>
            <h3 class="sidebar-legend-subheader">${legend.title}</h3>
            
            <div class="sidebar-legend-content-container flex-row flex-around">
                ${legend.icons.map((icon, i) => `
                    <div class="sidebar-legend-content flex-column flex-align-center">
                        <span class="legend-icon-${legend.iconType}" style="background-color:${icon}"></span>
                        <span class="legend-text">${text[i]}</span>
                    </div>
                `).join(' ')}
            </div>
        </article>
    `
}

export { handleLegend }