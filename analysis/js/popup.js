const clickLayers = ['priority', 'priority-ipd', 'existing-conditions', 'passenger-rail', 'lowstress-islands']

const makePopup = () => new mapboxgl.Popup()

const makePopupContent = (map, target, popup) => {
    const features = target.features[0]
    const props = features.properties
    const layer = features.layer.id
    const popupFnc = getPopupHTMLFnc[layer]

    const html = popupFnc(props, layer)

    popup
    .setLngLat(target.lngLat)
    .setHTML(html)
    .addTo(map)
}

// LTS popups
const makeLTSPopupHTML = props => {
    return `
        <h3 class="popup-header">LTS Score: ${props.lts_score}</h3>
        <span class="popup-span">
            <p>LTS score is calculated as a function of the following three values:</p>
            <ul class="list-unstyled">
                <li class="popup-li"><strong>Bike Facilities:</strong> ${props.bikefacili}</li>
                <li class="popup-li"><strong>Total Lanes:</strong> ${props.totnumlane}</li>
                <li class="popup-li"><strong>Speed:</strong> ${props.speed_lts} mph</li>
                <hr class="popup-hr" />
                <li class="popup-li"><strong>Segment Length:</strong> ${props.length} miles</li>
                <li class="popup-li"><strong>Slope:</strong> ${(props.slope_perc * 100).toPrecision(2)}%</li>
            </ul>
        </span>
    `
}

// priority popups
const makePriorityPopupHTML = (props, layer) => {
    let score = 0
    let isIPD = ''

    if(layer === 'priority') {
        score = props.main_priority
        
    } else {
        score = props.main_priority_ipd
        isIPD = 'Equity-focused '
    }
    
    return `
        <h3 class="popup-header">${isIPD}Priority Score: ${score}%</h3>
        <span class="popup-span">
            <p>Priority units are percentage bins, the top 10% are more important than the top 50%.</p>
        </span>
    `
}

// passenger rail
const makePassengerRailPopupHTML = props => {
    return `
        <h3 class="popup-header">${props.station} Station</h3>
        <span class="popup-span">
            <strong>line name:</strong> ${props.line}<br />
            <strong>type:</strong> ${props.type}<br />
            <strong>operator:</strong> ${props.operator}
        </span>
    `
}

// low-stress *special case. Needs to generate popup AND update map styles w/selected island.
// highlighting tbd
const makeLowStressPopupHTML = props => {
    return `
        <h3 class="popup-header">Island Number: ${props.island_num}</h3>
        <span class="popup-span">
            <p>Clicking a segment will highlight the island it belongs to. Popup text tbd if needed.</p>
        </span>
    `
}

// all popups
const getPopupHTMLFnc = {
    'existing-conditions': makeLTSPopupHTML,
    'priority': makePriorityPopupHTML,
    'priority-ipd': makePriorityPopupHTML,
    'passenger-rail': makePassengerRailPopupHTML,
    'lowstress-islands': makeLowStressPopupHTML
}

export { makePopup, makePopupContent, clickLayers }