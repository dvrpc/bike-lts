const clickLayers = ['priority', 'priority-ipd', 'existing-conditions', 'passenger-rail', 'trolley', 'bus', 'schools-combined', 'transit', 'transit-ipd']

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
            <p>LTS score factors:</p>
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

    const moreThan = 100 - score
    
    return `
        <h3 class="popup-header">${isIPD}Priority Score: ${score}%</h3>
        <span class="popup-span">
            <p>This segment would enable more low-stress connections than <strong>${moreThan}%</strong> of the other LTS 3 segments in the County.</p>
        </span>
    `
}

const makeTransitHTML = props => {
    return `
        <h3 class="popup-header">Segment id: ${props.id}</h3>
        <span class="popup-span">
            This road segment enables low-stress connections to <strong>${props.mode}</strong> stops within 3 miles
        </span>
    `
}

// passenger rail
const makePassengerRailPopupHTML = props => {
    return `
        <h3 class="popup-header">${props.station} Station</h3>
        <ul class="list-unstyled popup-ul">
            <li class="popup-li"><strong>line name:</strong> ${props.line}</li>
            <li class="popup-li"><strong>type:</strong> ${props.type}</li>
            <li class="popup-li"><strong>operator:</strong> ${props.operator}</li>
        </ul>
    `
}

const makeTrolleyPopupHTML = props => {
    return `
        <h3 class="popup-header">Route ${props.route}</h3>
        <ul class="list-unstyled popup-ul">
            <li class="popup-li"><strong>Stop Name:</strong> ${props.stop_name}</li>
        </ul>
    `
}

const makeBusPopupHTML = props => {
    return `
        <h3 class="popup-header">${props.stop_name}</h3>
        <ul class="list-unstyled popup-ul">
            <li class="popup-li"><strong>Route:</strong> ${props.route}</li>
            <li class="popup-li"><strong>Direction:</strong> ${props.direction}</li>
        </ul>
    `
}

const makeSchoolsCombinedHTML = props => {
    // @NOTE: instead of being blank, empty districts are an empty field of length 1...
    return `
    <h3 class="popup-header">${props.schoolname}</h3>
    <ul class="list-unstyled popup-ul">
            <li class="popup-li"><strong>District:</strong> ${props.districtna.length > 2 ? props.districtna : 'not provided'}</li>
            <li class="popup-li"><strong>City:</strong> ${props.city}</li>
        </ul>
    `
}

// all popups
const getPopupHTMLFnc = {
    'existing-conditions': makeLTSPopupHTML,
    'priority': makePriorityPopupHTML,
    'priority-ipd': makePriorityPopupHTML,
    'passenger-rail': makePassengerRailPopupHTML,
    'trolley': makeTrolleyPopupHTML,
    'bus': makeBusPopupHTML,
    'schools-combined': makeSchoolsCombinedHTML,
    'transit': makeTransitHTML,
    'transit-ipd': makeTransitHTML
}

export { makePopup, makePopupContent, clickLayers }