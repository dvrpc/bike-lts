const makePopup = () => new mapboxgl.Popup()

const makePopupContent = (map, target, popup) => {
    const props = target.features[0].properties
    const html = makePopupHTML(props)

    popup
    .setLngLat(target.lngLat)
    .setHTML(html)
    .addTo(map)
}

const makePopupHTML = props => {
    return `
        <span class="popup-span">
            <strong>LTS Score:</strong> ${props.lts_score}<br />
            <strong>Bike Facilities:</strong> ${props.bikefacili}<br />
            <strong>Segment Length:</strong> ${props.length} miles<br />
            <strong>Total Lanes:</strong> ${props.totnumlane}
        </span>
    `
}

export { makePopup, makePopupContent }