import legends from './legendConfigs.js'

const handleLegend = (legend, checked, acca) => {
    // get legend container (obviously not this way)
    const container = document.getElementById('sidebar-legends-container')
    const children = container.children
    let hasLegend = false
    let legendReps = 0

    // if legend already exists, get it
    for(var i = 0; i < children.length; i++) {
        if(children[i].dataset.filterType === legend) {
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
                    <div class="sidebar-legend-content flex-column">
                        <span class="legend-icon-${legend.iconType}" style="background-color:${icon}"></span>
                        <span class="legend-text">${text[i]}</span>
                    </div>
                `).join(' ')}
            </div>
        </article>
    `
}

export default handleLegend