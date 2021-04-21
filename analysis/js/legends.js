import legends from './legendConfigs.js'

const addLegend = e => {
    // loop thru existing legends to check if new legend 
    
    // if yes, return false
    
    // if now, create appropriate legend and return el
        // or just append cause we'll already be in contact w/legends container
}

const removeLegend = e => {

}

const makeLegend = type => {
    const legend = legends[type]

    return `
        <section class="sidebar-legend-section">
            <h3 class="sidebar-legend-subheader">${legend.title}</h3>
            
            <div class="sidebar-legend-content-container">
                <div class="sidebar-legend-content sidebar-legend-icons flex-row flex-around">
                    <span class="lts-legend-icon lts-legend-1"></span>
                    <span class="lts-legend-icon lts-legend-2"></span>
                    <span class="lts-legend-icon lts-legend-3"></span>
                    <span class="lts-legend-icon lts-legend-4"></span>
                </div>

                <div class="sidebar-legend-content sidebar-legend-values flex-row flex-around">
                    ${legend.text.map(text => `<span class="lts-legend">${text}</span>`)}
                </div>
            </div>
        </section>
    
    `
}

export { addLegend, removeLegend }