const clickLayers = ['priority', 'priority-ipd', 'existing-conditions', 'passenger-rail']

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
        <span class="popup-span">
            <h3 class="popup-header">LTS Score: ${props.lts_score}</h3>
            <p>LTS score is calculated as a function of the following 3 values:</p>
            <strong>Bike Facilities:</strong> ${props.bikefacili}<br />
            <strong>Total Lanes:</strong> ${props.totnumlane}<br />
            <strong>Speed:</strong> ${props.speed_lts} mph<br />
            <hr />
            <strong>Segment Length:</strong> ${props.length} miles<br />
            <strong>Slope:</strong> ${Math.round((props.slope_perc) * 100)}%
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
        isIPD = 'Equity-focused'
    }
    
    return `
        <span class="popup-span">
            <h3 class="popup-header">${isIPD} Priority Score: ${score}%</h3>
            <p>Priority units are percentage bins, the top 10% are more important than the top 50%.</p>
        </span>
    `
}

// passenger rail
const makePassengerRailPopupHTML = props => {
    return `
        <span class="popup-span">
            <h3 class="popup-header">Operator: ${props.operator}</h3>
            <strong>type:</strong> ${props.type}<br />
            <strong>line name:</strong> ${props.line}<br />
            <strong>station:</strong> ${props.station}
        </span>
    `
}

// all popups
const getPopupHTMLFnc = {
    'existing-conditions': makeLTSPopupHTML,
    'priority': makePriorityPopupHTML,
    'priority-ipd': makePriorityPopupHTML,
    'passenger-rail': makePassengerRailPopupHTML
}

export { makePopup, makePopupContent, clickLayers }