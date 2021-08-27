import * as layers from './mapLayers.js'

mapboxgl.accessToken = 'pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA'

const customStyles = {
    'version': 8,
    'glyphs': 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
    'sources': {
        'Boundaries': {
            type: 'vector',
            url: 'https://tiles.dvrpc.org/data/dvrpc-municipal.json'
        },
        'lts': {
            type: 'vector',
            url: 'https://tiles.dvrpc.org/data/lts-layertest.json'
        }
    },
    'layers': [
        layers.countyFill,
        layers.countyOutline,
        layers.municipalityOutline
    ],
}

const customMap = container => {
    const center = container.center || [-75.2273, 40.071]
    const bounds = container.bounds || [[-76.09405517578125, 39.49211914385648],[-74.32525634765625,40.614734298694216]]

    const map = new mapboxgl.Map({
        container: container,
        style: customStyles,
        attributionsControl: false,
        center: center,
        bounds: bounds,
        interactive: false
    })

    return map
}

export default customMap