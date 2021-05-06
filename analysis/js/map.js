mapboxgl.accessToken = 'pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA'

const initMap = () => {
    const longitudeOffset = window.innerWidth > 800 ? -75.8 : -75.2273
    const zoom = window.innerWidth <= 420 ? 7.3 : 8.45

    return new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [longitudeOffset, 40.071],
        zoom: zoom
    })
}

// create custom extent btn
const makeRegionalExtentEls = map => {
    const longitudeOffset = window.innerWidth > 800 ? -75.8 : -75.2273
    const zoom = window.innerWidth <= 420 ? 7.3 : 8.45

    const dvrpcExtent = {
        center: [longitudeOffset, 40.0518322],
        zoom: zoom
    }

    const button = document.createElement('button')
    const icon = document.createElement('img')

    button.type = 'button'
    icon.id = 'regional-extent-img'
    icon.alt = 'DVRPC Alternative Logo'
    icon.src = 'https://www.dvrpc.org/img/banner/new/bug-favicon.png'

    button.classList.add('mapboxgl-ctrl-icon')
    button.classList.add('mapboxgl-ctrl-dvrpc')

    button.setAttribute('aria-label', 'Default DVRPC Extent')

    button.onclick = () => map.flyTo({center: dvrpcExtent.center, zoom: dvrpcExtent.zoom}) 

    button.appendChild(icon)

    return button
}

const offsetGeocoder = (e, map) => {
    const bbox = e.result.bbox
    const leftPad = Math.round(window.innerWidth * 0.31)

    map.fitBounds(bbox, {
        padding: {left: leftPad}
    })
}

const makeControls = map => {
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        placeholder: 'Zoom to location',
        bbox: [-76.09405517578125,39.49211914385648,-74.32525634765625,40.614734298694216],
        marker: false
    })
    const navigationControl = new mapboxgl.NavigationControl();
    const extentControl = makeRegionalExtentEls(map)

    geocoder.on('result', e => {
        if(window.innerWidth > 800) offsetGeocoder(e, map)
    })

    // plug into mapbox fncs
    map.addControl(geocoder, 'top-left')
    navigationControl._extent = extentControl
    navigationControl._container.appendChild(extentControl)

    return navigationControl
}

const makeMap = () => {
    const map = initMap()
    const control = makeControls(map)

    map.addControl(control);

    return map
}

export default makeMap