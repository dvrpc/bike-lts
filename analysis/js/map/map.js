mapboxgl.accessToken = 'pk.eyJ1IjoiY3J2YW5wb2xsYXJkIiwiYSI6ImNseHVpZmprazI4bWoycXB2MTljMWF1YjUifQ.jLMaSXqIUV5N2IxYlk5ZiQ'

const initMap = () => {
    const longitudeOffset = window.innerWidth > 800 ? -75.6 : -75.2273
    const zoom = window.innerWidth <= 420 ? 7.3 : 8.42

    return new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [longitudeOffset, 40.071],
        zoom: zoom
    })
}

// create custom extent btn
const makeRegionalExtentEls = map => {
    const longitudeOffset = window.innerWidth > 800 ? -75.6 : -75.2273
    const zoom = window.innerWidth <= 420 ? 7.3 : 8.42

    const dvrpcExtent = {
        center: [longitudeOffset, 40.071],
        zoom: zoom,
        pitch: 0,
        bearing: 0
    }

    const button = document.createElement('button')
    const icon = document.createElement('img')

    button.type = 'button'
    button.title = 'Zoom to regional extent'

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

const makeControls = map => {
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        placeholder: 'Zoom to location',
        bbox: [-76.09405517578125,39.49211914385648,-74.32525634765625,40.614734298694216],
        marker: false
    })
    const navigationControl = new mapboxgl.NavigationControl();
    const extentControl = makeRegionalExtentEls(map)

    // plug into mapbox fncs
    map.addControl(geocoder, 'top-right')
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