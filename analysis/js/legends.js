import legends from './legendConfigs.js'

const handleLegend = (legend, checked, acca) => {
    // get legend container (obviously not this way)
    const container = document.querySelector('.sidebar-legends-container')
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
    
    if(checked && hasLegend) {
        // hack to handle existing conditions edge cases
        const increment = legendReps + acca > 4 ? 4 : legendReps + acca
        hasLegend.dataset.legendReps = increment
    
    } else if(checked && !hasLegend) {
        const newLegend = makeLegend(legend, acca)
        container.insertAdjacentHTML('beforeend', newLegend)
    
    // decrement if unchecked and either remove or update legendReps
    } else if(!checked) {
        const decrement = legendReps - acca

        if(decrement < 1) container.removeChild(hasLegend)
        else hasLegend.dataset.legendReps = decrement
    }
}

const makeLegend = (type, acca) => {
    const legend = legends[type]
 
    return `
        <section class="sidebar-legend-section" data-filter-type=${type} data-legend-reps=${acca}>
            <h3 class="sidebar-legend-subheader">${legend.title}</h3>
            
            <div class="sidebar-legend-content-container">
                <div class="sidebar-legend-content sidebar-legend-icons flex-row flex-around">
                    ${legend.icons.map(icon => `<span class="legend-icon-${legend.iconType}" style="background-color:${icon}"></span>`).join(' ')}
                </div>

                <div class="sidebar-legend-content sidebar-legend-values flex-row flex-around">
                    ${legend.text.map(text => `<span class="legend-text">${text}</span>`).join(' ')}
                </div>
            </div>
        </section>
    `
}

export default handleLegend