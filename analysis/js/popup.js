const makePopup = () => new mapboxgl.Popup()

const makePopupContent = (map, target, popup) => {
    const props = target.features[0].properties
    const html = makePopupHTML(props)

    popup
    .setLngLat(target.lngLat)
    .setHTML(html)
    .addTo(map)
}

// add slope 
const makePopupHTML = props => {
    return `
        <span class="popup-span">
            <h3 class="popup-header">LTS Score: ${props.lts_score}</h3>
            <p>LTS score is calculated as a function of the following 3 values:</p>
            <strong>Bike Facilities:</strong> ${props.bikefacili}<br />
            <strong>Total Lanes:</strong> ${props.totnumlane}<br />
            <strong>Speed:</strong> ${props.speed_lts} mph<br />
            <hr />
            <strong>Segment Length:</strong> ${props.length} miles<br />
            <strong>Slope:</strong> ${(props.slope_perc) * 100}%
        </span>
    `
}

export { makePopup, makePopupContent }